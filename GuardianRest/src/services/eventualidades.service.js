const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");
const {enviarNotificacion, addEvent, deleteEvent} = require("./email.service");
const GuardiasService = require("./guardias.service");
const moment = require("moment");


class EventualidadesService {

    constructor (schema) {
        this.seq = selectSchema(schema);
        this.Eventualidad = this.seq.models.Eventualidad;
        this.Guardia = this.seq.models.Guardia;
        this.GuardiaMedico = this.seq.models.GuardiaMedico;
        this.GuardiaMedicoPostulacion = this.seq.models.GuardiaMedicoPostulacion;
        this.Medico = this.seq.models.Medico;
        this.Usuario = this.seq.models.Usuario;
        this.schema = schema;
    }

    async obtenerEventualidades(idmedico){
        return await this.getEventualidadesMedico(idmedico);
    }

    async postularse(idmedico,ideventualidad){
        const medicopostulante = await this.Medico.findByPk(idmedico,{
            include: this.Usuario
        });
        if(!medicopostulante){
            throw ApiError.badRequestError("El medico postulante no existe");
        }
        const eventualidad = await this.Eventualidad.findByPk(ideventualidad);
        if(!eventualidad){
            throw ApiError.badRequestError("La eventualidad ingresada no existe");
        }
        const medicoLiberado = await eventualidad.getMedico();
        medicoLiberado.Usuario = await medicoLiberado.getUsuario();
        if(!eventualidad.activa){
            throw ApiError.badRequestError("La eventualidad ya ha sido atendida");
        }
        const guardia = await new GuardiasService(this.seq.options.schema).getGuardiaFullData(eventualidad.idguardia);
        if(moment().isAfter(guardia.fechainicio)){
            throw ApiError.badRequestError("La guardia ya paso");
        }
        const verificarDisponibilidad = await new GuardiasService(this.schema).verificarDisponibilidadMedico(idmedico,guardia.fechainicio,guardia.fechafin);
        if(verificarDisponibilidad.length){
            throw ApiError.badRequestError("El medico ya esta ocupado en esa fecha");
        }
        const especialidadesMedico = await medicopostulante.getEspecialidads({
            where:{
                id: eventualidad.idespecialidad
            }
        });
        if(!especialidadesMedico.length){
            throw ApiError.badRequestError("El medico no tiene la especialidad necesaria para cumplir con esta eventualidad");
        }

        if(guardia){
            await this.seq.transaction().then(async t => {
                try{
                    const message1 = `Ha sido asignado a la guardia: ${guardia.descripcion} del dia ${guardia.fechainicio}`;
                    const message2 = `Ha sido liberado de la guardia: ${guardia.descripcion} del dia ${guardia.fechainicio}`;
                    const guardiasService = new GuardiasService(this.seq.options.schema);
                    await guardiasService.updatePostulacion(medicopostulante.id,eventualidad.idguardia,'ACEPTADA',t);
                    await guardiasService.updatePostulacion(eventualidad.idmedico,eventualidad.idguardia,'CANCELADA',t);
                    await guardiasService.updateAsignacion(eventualidad.idmedico,eventualidad.idguardia,'CANCELADA',t);
                    await guardiasService.createOrUpdateGuardia(idmedico,eventualidad.idguardia,eventualidad.idespecialidad,t);
                    await enviarNotificacion(message1, medicopostulante.Usuario.telefono);
                    await enviarNotificacion(message2, medicoLiberado.Usuario.telefono);
                    await eventualidad.update({
                        activa: false
                    },{
                        transaction: t
                    });
                    await t.commit();
                    const tokenPostulante = await medicopostulante.getCalendarToken();
                    if(tokenPostulante){
                        let ubicacion;
                        if(guardia.Servicio.Local){
                            ubicacion = guardia.Servicio.Local.Ubicacion.Edificio.nombre+ " - " + guardia.Servicio.Local.Ubicacion.descripcion;
                        }
                        else{
                            ubicacion = guardia.Servicio.Domicilio.Zona.departamento + " - " + guardia.Servicio.Domicilio.Zona.localidad;
                        }
                        await addEvent(guardia.descripcion,ubicacion,guardia.fechainicio,guardia.fechafin,tokenPostulante,guardia.id);
                    }
                    const tokenLiberado = await medicoLiberado.getCalendarToken();
                    if(tokenLiberado){
                        await deleteEvent(tokenLiberado,guardia.id);
                    }
                }
                catch(err){
                    await t.rollback();
                    throw err;
                }
            
            });
        }
        else{
            throw ApiError.badRequestError("La guardia no existe");
        }
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

    getEventualidadesMedico = async function(idmedico){
        const schema = this.seq.options.schema;
        const options = {
          type: this.seq.QueryTypes.SELECT,
          nest: true,
          raw: true,
        }
        return await this.seq.query( `select e.*, m.id as "Medico.id", m.nombre as "Medico.nombre", m.apellido as "Medico.apellido", esp.nombre as "Especialidad.nombre", 
        g.id as "Guardia.id", g.descripcion as "Guardia.descripcion", g.estado as "Guardia.estado", g.fechainicio as "Guardia.fechainicio", g.duracion as "Guardia.duracion" from ${schema}.eventualidad as e
        join ${schema}.usuario as m ON e.idmedico = m.id
        join ${schema}.especialidad as esp ON e.idespecialidad = esp.id
        join ${schema}.guardia as g ON e.idguardia = g.id
        where e.idmedico != ${idmedico} and e.activa=true and
        g.fechainicio > now() and
        ${idmedico} not in (select idmedico from ${schema}.guardiamedicoasignacion where estado='ASIGNADA' and e.idguardia = idguardia) and
        e.idespecialidad in (select idespecialidad from ${schema}.especialidadmedico as em where em.idmedico=${idmedico});`,options);
    } 

}

module.exports = EventualidadesService;