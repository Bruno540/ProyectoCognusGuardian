const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");
const moment = require("moment");
const {enviarNotificacion, addEvent} = require("./email.service");
const AccionesMedicoService = require("./acciones.medico.service");

class GuardiasService {
  
    constructor (schema) {
        this.schema = schema;
        this.seq = selectSchema(schema);
        this.Guardia = this.seq.models.Guardia;
        this.Servicio = this.seq.models.Servicio;
        this.ServicioLocal = this.seq.models.ServicioLocal;
        this.ServicioDomicilio = this.seq.models.ServicioDomicilio;
        this.Especialidad = this.seq.models.Especialidad;
        this.Usuario = this.seq.models.Usuario;
        this.Medico = this.seq.models.Medico;
        this.GuardiaMedicoPostulacion = this.seq.models.GuardiaMedicoPostulacion;
        this.GuardiaMedico = this.seq.models.GuardiaMedico;
        this.TipoServicio = this.seq.models.TipoServicio;
        this.Edificio = this.seq.models.Edificio;
        this.Ubicacion = this.seq.models.Ubicacion;
        this.Zona = this.seq.models.Zona;
    }

    async obtenerGuardias(){
        return await this.Guardia.findAll({
            include:{
                model: this.Servicio,
                include:{
                    model: this.Especialidad
                }
            }
        });
    }

    async actualizarGuardia(id, fechainicio, fechafin){
        const guardia = await this.getGuardia(id);
        if(moment(fechafin).isBefore(moment(fechainicio))){
            throw ApiError.badRequestError("La fecha de fin no puede ser menor a la de inicio");
        }
        if(guardia.estado !== "PENDIENTE"){
            throw ApiError.badRequestError("Solo puede modificar guardias que no han sido publicadas");
        }
        guardia.fechainicio = fechainicio;
        guardia.fechafin = fechafin;
        return await guardia.save();
    }

    async agregarGuardia(datos){
        const fechafin = moment(datos.fechainicio).add(datos.duracion,'hours');
        if(await this.verifyGuardia(datos.idservicio,datos.fechainicio,fechafin)){
            throw ApiError.badRequestError("Ya hay una guardia del servicio creada en esa fecha");
        }
        datos.fechafin = fechafin;
        return !! await this.Guardia.create(datos,{
            model: this.Guardia
        });
    }

    async eliminarGuardia(id){
        const guardia = await this.getGuardia(id);
        if(guardia.estado!=="PENDIENTE"){
            throw ApiError.badRequestError("La guardia debe estar pendiente para poder eliminarse");
        }
        else{
            await guardia.destroy();
        }
    }

    async getCuposFaltantesGuardia(idguardia){
        const guardia = await this.getGuardia(idguardia);
        return await this.getCuposFaltantes(guardia);
    }

    async getCuposFaltantes(guardia){
        const schema = this.seq.options.schema;
        const servicio = await guardia.getServicio();
        const especialidades = await servicio.getEspecialidads();
        const faltantes= [];
        for(const esp of especialidades){
          const minimo = esp.EspecialidadServicio.cant_medicos;
          const res = await this.seq.query(`select count(asign.idmedico) FROM ${schema}.guardiamedicoasignacion as asign
            JOIN ${schema}.especialidad as e ON asign.especialidad = e.id where asign.especialidad=${esp.id} AND asign.idguardia=${guardia.id} AND (asign.estado='ASIGNADA' OR asign.estado='LIBERACION')
          `);
          const medicosActuales = res[0][0].count;
          const especialidad = {
            "idespecialidad":esp.id,
            "nombre_especialidad":esp.nombre,
            "restantes":minimo-medicosActuales
          }
          faltantes.push(especialidad);
        }
        return faltantes;
    }

    async asignarMedicosGuardia(idguardia,idmedicos){
        await this.seq.transaction().then(async t => {
            try{
                const guardia = await this.getGuardia(idguardia);
                if(guardia.estado !== "PUBLICADA"){
                    throw ApiError.badRequestError("La guardia debe estar PUBLICADA para poder hacer cambios");
                }
                const ckPostulados = await this.checkPostulacionGuardia(idmedicos,idguardia);
                if(ckPostulados!==idmedicos.length){
                    throw ApiError.badRequestError("Incoherencia en los postulados");
                }
                const disp = await this.verificarDisponibilidadMedico(idmedicos,guardia.fechainicio,guardia.fechafin);
                if(disp.length){
                    var res = `Alguno de los medicos ya ha sido asignado en el horario de esta guardia: <br>`;
                    await disp.forEach(guardia=>{
                        res= res + 
                        `${guardia.Asignacion[0].Usuario.nombre} ` + guardia.Asignacion[0].Usuario.apellido + ` -- ` + guardia.Asignacion[0].Usuario.email + "<br>";
                    });
                    throw ApiError.badRequestError(res);
                }
                const medicosEspecialidad = await this.getMedicosEspecialidadPostulacion(idmedicos,idguardia);
                const isFull = await this.isFull(medicosEspecialidad, guardia);
                if(isFull){
                    throw ApiError.badRequestError("Revise la cantidad de medicos que esta intentando asignar");
                }
                else{
                   
                    await this.updatePostulacion(idmedicos,idguardia,'ACEPTADA', t);
                    const medicos = await this.Medico.findAll({
                        where:{
                            id: idmedicos
                        },
                        include:this.Usuario
                    });
                    for(const medico of medicos){
                        const especialidad = await this.getPostulacionEspecialidad(medico.id,idguardia);
                        await this.createOrUpdateGuardia(medico.id, idguardia, especialidad, t);
                    }
                    await t.commit();
                    return true;
                }
            }
            catch(e){
                await t.rollback();
                throw e;
            }
        });
    }

    async isFull(medicos,guardia) {
        const schema = this.seq.options.schema;
        for(const esp of medicos){
          const minimo = esp.dataValues.cant_medicos;
          const res = await this.seq.query(`select count(asign.idmedico) FROM ${schema}.guardiamedicoasignacion as asign
            JOIN ${schema}.especialidad as e ON asign.especialidad = e.id where asign.especialidad=${esp.especialidad} AND asign.idguardia=${guardia.id} AND (asign.estado='ASIGNADA' OR asign.estado='LIBERACION')
          `);
          const count = res[0][0].count;
          if(count>=minimo || (parseInt(count)+parseInt(esp.dataValues.EspCount))>minimo){
            return true;
          }
        }
        return false;
    }

    async getGuardia(idguardia){
        const guardia = await this.Guardia.findByPk(idguardia);
        if(!guardia){
            throw ApiError.badRequestError("La guardia no existe");
        }
        return guardia;
    }

    async quitarAsignacionMedico(idguardia,idmedico){
        await this.seq.transaction().then(async t => {
            await this.getGuardia(idguardia).then(async guardia=>{
                try{
                    if(guardia.estado !== "PUBLICADA"){
                        throw ApiError.badRequestError("La guardia debe estar PUBLICADA para poder hacer cambios");
                    }
                    if(!guardia){
                        throw ApiError.badRequestError("La guardia no existe");
                    }
                    const medico = await this.Medico.findByPk(idmedico,{
                        include:this.Usuario
                    });
                    if(!medico){
                        throw ApiError.badRequestError("El medico no existe");
                    }
                    const asignado= await new AccionesMedicoService(this.seq.options.schema).getAsignacion(idmedico,idguardia);
                    if(!asignado){
                        throw ApiError.badRequestError("El medico no esta asignado a esta guardia");
                    }
                    if(asignado.estado==="LIBERACION"){
                        await this.updatePostulacion(idmedico,idguardia,'CANCELADA',t);
                        await asignado.destroy({transaction : t});
                        const message = `Se lo ha liberado de su asignacion a la guardia: ${guardia.descripcion} del dia ${guardia.fechainicio}`
                        await enviarNotificacion(message, medico.Usuario.telefono);
                        await t.commit();
                        return true;
                    }
                    await this.updatePostulacion(idmedico,idguardia,'PENDIENTE', t);
                    await this.updateAsignacion(idmedico,idguardia,'CANCELADA', t);
                    await t.commit();
                }
                catch(e){
                    await t.rollback();
                    throw e;
                }
            });
        });
    }

    async obtenerMedicosAsignados(idguardia){
        const guardia = await this.getGuardia(idguardia);
        return await this.GuardiaMedico.findAll({
            include:[
                {
                    model: this.Especialidad
                },
                {
                    model: this.Medico,
                    include: this.Usuario
                }
            ],
            where:{
                idguardia,
                estado:["ASIGNADA","LIBERACION"]
            }
        });
    }

    async getGuardiaFullData(idguardia){
        const guardia = await this.Guardia.findByPk(idguardia,{
            include:[
                {
                    model:this.Servicio,
                    include:[
                        {
                            model: this.ServicioLocal,
                            as: 'Local',
                            include:[
                                {
                                    model: this.TipoServicio
                                },
                                {
                                    model: this.Ubicacion,
                                    include: this.Edificio
                                }
                            ]
                        },
                        {
                            model: this.ServicioDomicilio,
                            as: 'Domicilio',
                            include: this.Zona
                        }
                    ]
                }
            ]
        });
        if(!guardia){
            throw ApiError.badRequestError("La guardia no existe");
        }
        return guardia;
    }

    async cerrarGuardia(idguardia){
        const guardia = await this.getGuardiaFullData(idguardia);
        if(guardia.estado!=="PUBLICADA"){
            throw ApiError.badRequestError("La guardia debe estar PUBLICADA para poder cerrarla");
        }
        await this.seq.transaction().then(async t => {
            try{
                if(await this.Completa(guardia)){
                    await guardia.update({
                        estado: "CERRADA"
                    },{transaction: t});
                    await this.GuardiaMedicoPostulacion.update({
                        estado: "RECHAZADA"
                    },{
                        where:{
                            idguardia: guardia.id,
                            estado: "PENDIENTE"
                        },
                        transaction: t
                    });
                    await this.GuardiaMedico.update({
                        estado: "ASIGNADA"
                    },{
                        where:{
                            idguardia: guardia.id,
                            estado:"LIBERACION"
                        },
                        transaction: t
                    });
                    const medicos = await guardia.getAsignacion({
                        where: {
                            '$GuardiaMedico.estado$': 'ASIGNADA'
                        }
                    });
                    let ubicacion;
                    if(guardia.Servicio.Local){
                        ubicacion = guardia.Servicio.Local.Ubicacion.Edificio.nombre+ " - " + guardia.Servicio.Local.Ubicacion.descripcion;
                    }
                    else{
                        ubicacion = guardia.Servicio.Domicilio.Zona.departamento + " - " + guardia.Servicio.Domicilio.Zona.localidad;
                    }
                    const fechaGuardia = moment(guardia.fechainicio).format('YYYY-MM-DD HH:mm');
                    const message = `Ha sido asignado a la guardia: ${guardia.descripcion} del dia ${fechaGuardia} en la ubicacion: ${ubicacion}`;
                    for(const medico of medicos){
                        const user = await medico.getUsuario();
                        await enviarNotificacion(message, user.telefono);
                        const token = await medico.getCalendarToken({
                            attributes:{
                                exclude:['idmedico']
                            },
                            raw: true
                        });
                        if(token){
                            await addEvent(guardia.descripcion,ubicacion,guardia.fechainicio,guardia.fechafin,token,guardia.id);
                        }                
                    }
                    await t.commit();
                }
                else{
                    throw ApiError.badRequestError("La guardia no esta completa");
                }
            }
            catch(e){
                await t.rollback();
                throw e;
            }
        });
    }

    async Completa(guardia) {
        const schema = this.seq.options.schema;
        const servicio = await guardia.getServicio();
        const especialidades = await servicio.getEspecialidads();
        for(const esp of especialidades){
          const minimo = esp.EspecialidadServicio.cant_medicos;
          const res = await this.seq.query(`select count(asign.idmedico) FROM ${schema}.guardiamedicoasignacion as asign
            JOIN ${schema}.especialidad as e ON asign.especialidad = e.id where asign.especialidad=${esp.id} AND asign.idguardia=${guardia.id} AND (asign.estado='ASIGNADA' OR asign.estado='LIBERACION')
          `);
          const count = res[0][0].count;
          if(count < minimo){
            return false;
          }
        }
        return true;
      }

    async obtenerMedicosPostulados(idguardia){
        const guardia = await this.getGuardia(idguardia);
        const postulados = await this.GuardiaMedicoPostulacion.findAll({
            order:[['ponderacion', 'DESC']],
            include:[
                {
                    model: this.Especialidad
                },
                {
                    model: this.Medico,
                    include: this.Usuario
                }
            ],
            where:{
                idguardia,
                estado:"PENDIENTE"
            }
        });
        return postulados;
    }

    async obtenerGuardiasFecha(fecha, rango){
        const fechainicio = moment(fecha).startOf(rango);
        const fechafin = moment(fecha).endOf(rango);
        return await this.Guardia.findAll({
            where:{
                [Op.or]:[
                    {
                        fechainicio:{
                            [Op.between]:[fechainicio,fechafin]
                        }
                    },
                    {
                        fechafin:{
                            [Op.between]:[fechainicio,fechafin]
                        }
                    } 
                  
                ]
              
            },
            include:{
                model: this.Servicio,
                include:{
                    model: this.Especialidad
                }
            }
        })
    }

    async guardiasPaginacion(size, page){
        let offset = (size)*(page-1);
        return await this.Guardia.findAndCountAll({
            limit: size,
            offset: offset,
            include: [
                {
                    model: this.Servicio
                }
            ]
        });
    }

    async publicarGuardia(idguardia){
        const guardia = await this.getGuardia(idguardia);
        if(!guardia){
            throw ApiError.badRequestError("No existe la guardia");
        }
        if(["PUBLICADA","CERRADA"].includes(guardia.estado)){
            throw ApiError.badRequestError("La guardia debe estar pendiente para publicarse");
        }
        await guardia.update({
            estado: 'PUBLICADA'
        });
    }

    async createOrUpdateGuardia(medico, idguardia, especialidad, transaction){
        await this.GuardiaMedico.findOne({
            where: {
                idmedico: medico,
                idguardia: idguardia
            }
        }).then((obj) => {
            // update
            if(obj){
                return obj.update({estado: "ASIGNADA"},{transaction});
            }
            // insert
            return this.GuardiaMedico.create({
                idmedico: medico,
                idguardia: idguardia,
                estado: 'ASIGNADA',
                especialidad:especialidad
            },{transaction});
        });
    }

    async updateAsignacion(idmedico, idguardia,estado, transaction){
        await this.GuardiaMedico.update({
            estado: estado
        },{
            where:{
                [Op.and]:[
                    {
                        idmedico
                    },
                    {
                        idguardia
                    }
                ]
            },
            transaction
        });
    }

    async updatePostulacion(idmedicos, idguardia,estado, transaction){
        await this.GuardiaMedicoPostulacion.update({
            estado: estado
        },{
            where:{
                [Op.and]:[
                    {
                        idmedico: idmedicos
                    },
                    {
                        idguardia
                    }
                ]
            },
            transaction
        });
    }

    async checkPostulacionGuardia(idmedicos, idguardia){
        return await this.GuardiaMedicoPostulacion.count({
            where:{
                [Op.and]:[
                    {
                        idmedico:idmedicos
                    },
                    {
                        idguardia:idguardia
                    },
                    {
                        estado:"PENDIENTE"
                    }
                ]
            }
        });
    }

    async getPostulacionEspecialidad(idmedico,idguardia){
        const postulacion = await this.GuardiaMedicoPostulacion.findOne({
            where:{
                idmedico,
                idguardia
            }
        });
        return postulacion.especialidad;
    }

    async getMedicosEspecialidadPostulacion(idmedicos, idguardia){
        const guardia = await this.getGuardia(idguardia);
        return await this.GuardiaMedicoPostulacion.findAll({
            attributes:['especialidad',[this.seq.fn('COUNT', 'especialidad'), 'EspCount'],[
                this.seq.literal(`(
                SELECT cant_medicos
                FROM "${this.schema}".especialidadservicio AS esp
                WHERE
                    esp.idespecialidad=especialidad AND
                    esp.idservicio=${guardia.idservicio}
            )`),
                'cant_medicos'
            ]],
            group: [this.seq.col('especialidad')],
            where:{
                idmedico: idmedicos,
                idguardia: idguardia
            }
        });
    }

    async verifyGuardia(idservicio,fechainicio,fechafin){
        return !!await this.Guardia.findOne({
            where:{
                idservicio,
                fechainicio:{
                    [Op.lte]:fechafin
                },
                fechafin:{
                    [Op.gte]:fechainicio
                }
            }
        });
    }

    async verificarDisponibilidadMedico(idmedico,fechainicio,fechafin){
        return await this.Guardia.findAll({
            include:{
                model: this.Medico,
                as: "Asignacion",
                include: this.Usuario
            },
            where:{
                [Op.and]:{
                    '$Asignacion.id$':idmedico,
                    '$Asignacion.GuardiaMedico.estado$':'ASIGNADA',
                    fechainicio:{
                        [Op.lte]:fechafin
                    },
                    fechafin:{
                        [Op.gte]:fechainicio
                    }
                }
            }
        });
    }

    async obtenerGuardia(id){
        const guardia = await this.Guardia.findByPk(id,{
            include:{
                model: this.Servicio,
                include:{
                    model: this.Especialidad
                }
            }
        });
        if(!guardia){
            throw ApiError.badRequestError("La guardia no existe");
        }
        return guardia;
    }
    
}

module.exports = GuardiasService;