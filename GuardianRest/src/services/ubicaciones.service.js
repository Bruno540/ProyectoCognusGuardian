const {selectSchema, sequelize} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");

class UbicacionesService {

    constructor (schema) {
        this.seq = selectSchema(schema);
        this.Edificio = this.seq.models.Edificio;
        this.ServicioLocal = this.seq.models.ServicioLocal;
        this.Ubicacion = this.seq.models.Ubicacion;
        this.TipoServicio = this.seq.models.TipoServicio;
    }


    async obtenerUbicaciones(){
        return await this.Ubicacion.findAll({
            include: this.Edificio
        });
    }

    async obtenerUbicacionesPaginacion(size,page){
        let offset = (size)*(page-1);
        return await this.Ubicacion.findAndCountAll({
            limit: size,
            offset: offset,
            include: this.Edificio
        });
    }

    async obtenerUbicacionesBusqueda(size,page,filter){
        let offset = (size)*(page-1);
        return await this.Ubicacion.findAndCountAll({
            where:{
                [Op.or]: [
                    {
                        descripcion: {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    }
                ]
            },
            limit: size,
            offset: offset,
            include: this.Edificio
        });
    }

    async agregarUbicacion(descripcion, idedificio){
        const edificio = await this.Edificio.findByPk(idedificio);
        if(!edificio){
            throw ApiError.badRequestError("El edificio no existe");
        }
        return await this.Ubicacion.create({
            descripcion,
            idedificio
        });
    }

    async getUbicacion(id,idedificio){
        const ubicacion = await this.Ubicacion.findOne({
            where:{
                id,
                idedificio
            }
        });
        if(!ubicacion){
            throw ApiError.badRequestError("La ubicacion no existe");
        }
        return ubicacion;
    }

    async actualizarUbicacion(id, idedificio,descripcion){
        const ubicacion = await this.getUbicacion(id, idedificio);
        await ubicacion.update({
            descripcion
        });
    }

    async obtenerUbicacion(id,idedificio){
        return await this.getUbicacion(id,idedificio);
    }

    async eliminarUbicacion(id,idedificio){
        const ubicacion = await this.getUbicacion(id,idedificio);
        const servicio = await ubicacion.getServicioLocal({
            where:{
                idedificio
            }
        });
        if(servicio){
            throw ApiError.badRequestError("La ubicacion esta asociada a un servicio");
        }
        await ubicacion.destroy();
    }

}

module.exports = UbicacionesService;