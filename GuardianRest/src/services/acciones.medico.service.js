const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");
const moment = require('moment');
const { syncCalendar, getTokenByCode, syncPhone } = require("./email.service");
const bcrypt = require("bcryptjs");
const EstadisticasService = require("./estadisticas.service");



class AccionesMedicoService {

    constructor (schema) {
        this.seq = selectSchema(schema);
        this.Usuario =this.seq.models.Usuario;
        this.Medico =this.seq.models.Medico;
        this.Guardia =this.seq.models.Guardia;
        this.GuardiaMedico =this.seq.models.GuardiaMedico;
        this.GuardiaMedicoPostulacion =this.seq.models.GuardiaMedicoPostulacion;
        this.Especialidad =this.seq.models.Especialidad;
        this.Eventualidad =this.seq.models.Eventualidad;
        this.Servicio =this.seq.models.Servicio;
        this.ServicioLocal =this.seq.models.ServicioLocal;
        this.ServicioDomicilio =this.seq.models.ServicioDomicilio;
        this.CalendarToken = this.seq.models.CalendarToken;
    }


    async obtenerDatos(id){
        return await this.Medico.findByPk(id,{
            include: [
                {
                    model: this.Usuario
                },
                {
                    model: this.Especialidad
                }
            ]
        });
    }

    async obtenerGuardias(id){
        return await this.Medico.findByPk(id).then(async medico=>{
            const today = moment();
            return await medico.getAsignacion({
               where:{
                    [Op.or]:[
                        {
                            '$GuardiaMedico.estado$':'ASIGNADA'
                        },
                        {
                            '$GuardiaMedico.estado$':'LIBERACION'
                        }
                    ],
                    fechainicio : {
                        [Op.gte]: today
                    }
               }
           });
        });
    }

    async obtenerPostulaciones(id){
        return await this.Medico.findByPk(id).then(async medico => {
            return await medico.getPostulacion();
        });
    }

    async obtenerGuardiasDisponibles(id){
        return await this.Medico.findByPk(id).then(async (user)=>{
            return await user.getEspecialidads().then(async especialidades => {
                if(especialidades && especialidades.length){
                    return await this.getGuardiasEspecialidades(especialidades, id);
                }
                else{
                    throw ApiError.badRequestError("El medico no tiene especialidades");
                }
            });
        });
    }

    async getGuardiasEspecialidades(especialidades,id){
        const schema = this.seq.options.schema;
        var whereClause = "in(";
        for(const[index, esp] of especialidades.entries()){
          if(index==0){
            whereClause+=`${esp.id}`;
          }
          else{
            whereClause+=`,${esp.id}`;
          }
        }
        whereClause+=')';
        return await this.seq.query(`
          select distinct g.* from ${schema}.guardia as g 
          JOIN ${schema}.servicio as s ON g.idservicio=s.id 
          JOIN ${schema}.especialidadservicio as esp ON s.id=esp.idservicio 
          where esp.idespecialidad ${whereClause} AND g.estado='PUBLICADA' and g.id not in
          (
          select mp.idguardia from ${schema}.guardiamedicopostulacion as mp WHERE idmedico IN (${id}) and (mp.estado = 'ACEPTADA'  or mp.estado = 'RECHAZADA' or mp.estado = 'PENDIENTE')) 
        `,{
          model: this.Guardia,
          mapToModel: true
        });
      }

    async contarHorasMedico(idmedico, fechaGuardia){
        const today = moment(new Date(fechaGuardia));
        const startOfWeek = today.startOf('week').toDate();
        const endOfWeek   = today.endOf('week').toDate();
        const horasGuardia = await this.Guardia.findAll({
            include:{
                model: this.Medico,
                as: "Asignacion",
                attributes:[],
                through: {attributes: []}
            },
            attributes: [
                [this.seq.fn('sum', this.seq.col('duracion')), 'cant_horas'],
            ],
            where:{
                '$Asignacion.GuardiaMedico.idmedico$':idmedico,
                '$Asignacion.GuardiaMedico.estado$':'ASIGNADA',
                fechainicio:{
                    [Op.between]: [startOfWeek, endOfWeek]
                }
            },
            group: ['Guardia.id','Asignacion.id'],
        });
        let total = 0;
        for(const horas of horasGuardia){
            const parcial = parseInt(horas.dataValues.cant_horas)
            total = total + parcial;
        }
        return total;
    }

    async getEspecialidadesGuardia(id,idguardia){
        return await this.Medico.findByPk(id).then(async medico=>{
            const especialidadesId = await medico.getEspecialidads({
                attributes:["id"]
            }).then(esp => esp.map(account => account.id));
            return await this.Guardia.findByPk(idguardia).then(async guardia=>{
                return await guardia.getServicio().then(async servicio =>{
                    return await servicio.getEspecialidads({
                        where:{
                            id:{
                                [Op.in]:especialidadesId
                            }
                        }
                    });
                });
            });
        })
    }

    async getAsignacion(idmedico,idguardia){
        return await  this.GuardiaMedico.findOne({
            where:{
                idguardia,
                idmedico
            }
        });
    }


    async getPostulacion(idmedico,idguardia){
        return await this.GuardiaMedicoPostulacion.findOne({
            where:{
                idguardia,
                idmedico
            }
        });
    }

    async postularseGuardia(idmedico,idguardia, idesp){
        const especialidad = await this.Especialidad.findByPk(idesp);
        if(!especialidad){
            throw ApiError.badRequestError("No existe la especialidad seleccionada");
        }
        const medico = await this.Medico.findByPk(idmedico);
        if(!medico){
            throw ApiError.badRequestError("No existe el medico seleccionado");
        }
        await this.Guardia.findByPk(idguardia).then(async guardia=>{
            const especialidadesMedico = await medico.getEspecialidads({
                where:{
                    id: idesp
                }
            });
            if(!especialidadesMedico.length){
                throw ApiError.badRequestError("No tiene la especialidad necesaria para postularse a esta guardia");
            }
            const servicio = await guardia.getServicio();
            const guardiaEspecialidades = await servicio.getEspecialidads({
                where:{
                    id: idesp
                }
            });
            if(!guardiaEspecialidades.length){
                throw ApiError.badRequestError("La guardia no necesita de la especialidad indicada");
            }
            const asignado = await this.getAsignacion(idmedico,idguardia);
            if(asignado){
                throw ApiError.badRequestError(`El medico ya tiene una asignacion ${asignado.estado}  a esta guardia`);
            }
            const postulado = await this.getPostulacion(idmedico,idguardia);
            if(postulado && postulado.estado !== "CANCELADA"){
                throw ApiError.badRequestError("El medico ya se ha postulado a esta guardia");
            }
            const disponible = await this.verificarDisponibilidadMedico(idmedico,guardia.fechainicio, guardia.fechafin);
            if(!disponible){
                throw ApiError.badRequestError("Ya esta asignado a una guardia en ese horario");
            }
            const horas = await this.contarHorasMedico(idmedico, guardia.fechainicio);
            if(horas>=40 || horas+guardia.duracion>=45){
                throw ApiError.badRequestError("Se supera la cantidad de horas establecida en la semana de la guardia seleccionada");
            }
            else{
                if(postulado && postulado.estado === "CANCELADA"){
                    await postulado.update({
                        estado: 'PENDIENTE',
                        especialidad: idesp
                    });
                    return
                }else{
                    const ponderacion = await this.ponderarMedico(idmedico, guardia);
                    return !!await this.GuardiaMedicoPostulacion.create({
                        idmedico,
                        idguardia,
                        especialidad:idesp,
                        ponderacion: ponderacion
                    });
                }
            }
        });
    }

    async cancelarPostulacion(id,idguardia){
        return await this.getPostulacion(id,idguardia).then(async postulacion=>{
            if(!postulacion){
                throw ApiError.badRequestError("No se ha encontrado la postulacion indicada");
            }
            if(postulacion.estado==="PENDIENTE"){
                const asignacion = await this.getAsignacion(id,idguardia);
                await this.seq.transaction().then(async t => {
                    try{
                        if(asignacion){
                            await asignacion.destroy({transaction: t});
                        }
                        await postulacion.update({
                            estado: "CANCELADA"
                        },{transaction: t});
                        await t.commit();
                    }
                    catch(e){
                        await t.rollback();
                        throw e;
                    }
                });
            }
            else{
                throw ApiError.badRequestError("Su postulacion ya no esta pendiente, debe liberar su asignacion");
            }
        });
    }

    async ofrecerLiberarGuardia(idmedico,idguardia){
        const guardia = await this.Guardia.findByPk(idguardia);
        if(!guardia){
            throw ApiError.badRequestError("Guardia no encontrada");
        }
        if(moment().isAfter(guardia.fechainicio)){
            throw ApiError.badRequestError("La guardia ya paso");
        }
        const asignado = await this.getAsignacion(idmedico,idguardia);
        if(!asignado || asignado.estado!=="ASIGNADA"){
            throw ApiError.badRequestError("No esta asignado a esa guardia");
        }
        if(guardia.estado!=='CERRADA'){
            if(asignado.estado==="LIBERACION"){
                throw ApiError.badRequestError("Ya ha solicitado la liberacion de esa guardia");
                
            }
            else{
                return await asignado.update({
                    estado: 'LIBERACION'
                }).then(update => update!==0);
            }
        }
        else{
            const eventualidad = await this.Eventualidad.findOne({
                where:{
                    idmedico,
                    idguardia
                }
            })
            if(eventualidad && eventualidad.activa){
                throw ApiError.badRequestError("Ya solicitado la liberacion de la guardia");
            }
            else if(eventualidad && !eventualidad.activa){
                return await eventualidad.update({
                    activa: true
                });
            }
            else{
                return !!await this.Eventualidad.create({
                    idmedico,
                    idguardia,
                    idespecialidad: asignado.especialidad
                });
            }
        }
    }

    async verificarDisponibilidadMedico(idmedico,fechainicio,fechafin){
        return await this.Guardia.count({
            include:{
                model: this.Medico,
                as: "Asignacion"
            },
            where:{
                [Op.and]:{
                    '$Asignacion.id$':idmedico,
                    fechainicio:{
                        [Op.lte]:fechafin
                    },
                    fechafin:{
                        [Op.gte]:fechainicio
                    }
                },
                '$Asignacion.GuardiaMedico.estado$':"ASIGNADA"
            }
        }).then(guardias=>guardias===0)
    }

    async ponderarMedico(idmedico, guardia){
        let ponderacion = 1;
        const medico = await this.Medico.findByPk(idmedico);
        const servicio = await this.Servicio.findByPk(guardia.idservicio, {
            include:[
                {
                    model: this.ServicioLocal,
                    as: 'Local'
                },
                {
                    model: this.ServicioDomicilio,
                    as: 'Domicilio'
                }
            ]
        });
        if(servicio.Domicilio){
            //es domicilio
            const zonaServicio = await servicio.Domicilio.getZona();
            if (zonaServicio.id === medico.idzona){
                ponderacion = ponderacion + 10;
            }
        }
        const total = await this.contarHorasMedico(idmedico, guardia.fechainicio)
        if(total<10){
            ponderacion = ponderacion + 10;
        }
        return ponderacion
    }

    async sincronizarCalendario(user){
        const medico = await this.Medico.findByPk(user.id);
        const token = await medico.getCalendarToken();
        if(token){
            throw ApiError.badRequestError("Ya esta sincronizado con Google Calendar");
        }
        return syncCalendar(user);
    }
  
    async checkIfSyncCalendar(user){
        const medico = await this.Medico.findByPk(user.id);
        return !!await medico.getCalendarToken();
    }

    async quitarSincronizacionCalendario(user){
        const medico = await this.Medico.findByPk(user.id);
        const token = await medico.getCalendarToken();
        if(!token){
            throw ApiError.badRequestError("No esta sincronizado con Google Calendar");
        }
        token.destroy();
    }
  

    async confirmarSyncCalendar(code,idmedico){
        const medico = await this.Medico.findByPk(idmedico);
        const isToken = await medico.getCalendarToken();
        if(isToken){
            throw ApiError.badRequestError("Ya esta sincronizado con Google Calendar");
        }
        if(!medico){
            throw ApiError.badRequestError("El medico no existe");
        }
        const token = await getTokenByCode(code);
        token.idmedico = idmedico;
        await this.CalendarToken.create(token);
    }

    async changePasswordMedico(user, newPassword, newPasswordVerification){
        const usuario = await this.Usuario.findByPk(user.id);
        if(!newPassword){
            throw ApiError.badRequestError("Debe ingresar una contraseña");
        }
        if(newPassword!==newPasswordVerification){
            throw ApiError.badRequestError("Las contraseñas ingresadas no coinciden");
        }
        newPassword = await bcrypt.hash(newPassword, 12);
        await usuario.update({
            password: newPassword
        });
    }

    async  obtenerGuardiasCompletadas(id,fechainicio, fechafin){
        await new EstadisticasService(this.seq.options).verificarFechas(fechainicio, fechafin);
        let condition={};
        if(fechainicio && fechafin){
            condition={
                fechainicio:{
                    [Op.between]:[fechainicio,fechafin]
                },
                fechafin:{
                    [Op.between]:[fechainicio,fechafin]
                }
            }
        }
        return await this.Medico.findByPk(id).then(async medico=>{
            return await medico.getAsignacion({
               where:{
                    [Op.or]:[
                        {
                            '$GuardiaMedico.estado$':'ASIGNADA'
                        },
                        {
                            '$GuardiaMedico.estado$':'LIBERACION'
                        }
                    ],
                    [Op.and]:[
                        {
                            fechainicio:{
                                [Op.lt]:moment()
                            },
                        },
                        condition
                    ]
               }
           });
        });
    }

}

module.exports = AccionesMedicoService;