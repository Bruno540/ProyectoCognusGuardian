const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");
const moment = require("moment");

class EstadisticasService {

    constructor (schema) {
        this.seq = selectSchema(schema);
    }

    async obtenerHorasMedicos(fechainicio, fechafin){
        this.verificarFechas(fechainicio,fechafin);
        const schema = this.seq.options.schema;
        let extra="";
        if(fechainicio && fechafin){
            extra = `AND Date(g.fechainicio) BETWEEN '${fechainicio}' AND '${fechafin}'`
        }
        return await this.seq.query(`select u.id, u.nombre, u.apellido, u.email, SUM(g.duracion) as total from ${schema}.usuario as u 
            join ${schema}.guardiamedicoasignacion as ma ON u.id=ma.idmedico
            join ${schema}.guardia as g ON g.id=ma.idguardia
            where ma.estado='ASIGNADA' AND g.estado='CERRADA' ${extra}
            GROUP BY(u.id, u.nombre,u.apellido,u.email)
            ORDER BY total desc
        `).then(datos => datos[0]);
    }

    async obtenerHorariosFavoritos(fechainicio, fechafin){
        this.verificarFechas(fechainicio,fechafin);
        const schema = this.seq.options.schema;
        let extra="";
        if(fechainicio && fechafin){
            extra = `WHERE gp."createdAt" BETWEEN '${fechainicio}' AND '${fechafin}'`
        }
        return await this.seq.query(`select date_part('hour', g.fechainicio) as x, round(count(g.id)/sum(count(g.id)) OVER (),2) *100 AS y FROM ${schema}.guardia as g 
        JOIN ${schema}.guardiamedicopostulacion as gp ON g.id=gp.idguardia ${extra}
        GROUP BY date_part('hour', g.fechainicio) order by x`).then(datos => datos[0]);
    }

    verificarFechas(fechainicio, fechafin){
        if((!fechainicio && fechafin)||(fechainicio && !fechafin)){
            throw ApiError.badRequestError("Ingrese un rango completo");
        }
        if(moment(fechafin).isBefore(moment(fechainicio))){
            throw ApiError.badRequestError("La fecha de inicio debe ser anterior a la fecha de fin");
        }
    }

    async obtenerEventualidades(fechainicio, fechafin){
        this.verificarFechas(fechainicio,fechafin);
        const schema = this.seq.options.schema;
        let extra="";
        if(fechainicio && fechafin){
            extra = `WHERE Date(ev."createdAt") BETWEEN '${fechainicio}' AND '${fechafin}'`
        }
        return await this.seq.query(`select	TO_CHAR(ev."createdAt", 'TMMonth YYYY') AS month, count(ev.id) from ${schema}.eventualidad as ev ${extra}
        group by month order by min(ev."createdAt")`).then(datos => datos[0]);
    }
    
}

module.exports = EstadisticasService;