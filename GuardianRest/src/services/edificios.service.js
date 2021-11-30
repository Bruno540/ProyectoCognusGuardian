const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");

class EdificiosService {

    constructor (schema) {
        this.seq = selectSchema(schema);
        this.Edificio = this.seq.models.Edificio;
        this.ServicioLocal = this.seq.models.ServicioLocal;
        this.Ubicacion = this.seq.models.Ubicacion;
        this.TipoServicio = this.seq.models.TipoServicio;
    }

    async obtenerEdificios(){
        return await this.Edificio.findAll();
    }

    async agregarEdificio(datos,file){
        let rutaFoto = "uploads/default.png";
        if(file){
            rutaFoto="uploads/" + file.filename;
        }
        datos.rutaFoto = rutaFoto;
        return !!await this.Edificio.create(datos);
    }

    async eliminarEdificio(id){
        const ocupado = await this.ServicioLocal.count({
            where:{
                idedificio: id
            }
        })!==0;
        if(ocupado){
            throw ApiError.badRequestError("El edificio tiene servicios asignados");
        }
        const ubicaciones = await this.Ubicacion.findOne({
            where:{
                idedificio:id
            }
        });
        if(ubicaciones){
            throw ApiError.badRequestError("El edificio tiene ubicaciones asignadas");
        }
        return await this.Edificio.destroy({
            where: {
                id
            }
        })!==0;
    }

    async obtenerSalasEdificioPag(idedificio, size,page){
        let offset = (size)*(page-1);
        const edificio = await this.getEdificio(idedificio);
        return await this.Ubicacion.findAndCountAll({
            where: {
                idedificio
            },
            limit: size,
            offset: offset,
        })
    }

    async obtenerUbicacionesDisponibles(idedificio){
        const edificio = await this.getEdificio(idedificio);
        return await edificio.getUbicacions({
            include:{
                model: this.ServicioLocal,
                on: {
                    col1: this.seq.where(this.seq.col(`ServicioLocal.idubicacion`), "=", this.seq.col(`Ubicacion.id`)),
                    col2: this.seq.where(this.seq.col(`ServicioLocal.idedificio`), "=", this.seq.col(`Ubicacion.idedificio`))
                }
            },
            where:{
                '$ServicioLocal$':{
                    [Op.is]: null,
                }
            }
        });
    }

    async getEdificio(idedificio){
        const edificio = await this.Edificio.findOne({
            where:{
                id:idedificio
            }
        });
        if(!edificio){
            throw ApiError.badRequestError("El edificio no existe");
        }
        return edificio;
    }

    async obtenerServiciosEdificio(idedificio){
        const edificio = await this.getEdificio(idedificio);
        return await edificio.getServicioLocals({
            include:[
                {
                    model: this.Ubicacion,
                    on: {
                        col1: this.seq.where(this.seq.col(`ServicioLocal.idubicacion`), "=", this.seq.col(`Ubicacion.id`)),
                        col2: this.seq.where(this.seq.col(`ServicioLocal.idedificio`), "=", this.seq.col(`Ubicacion.idedificio`))
                    }
                },
                {
                    model:this.TipoServicio
                }
            ]
        });
    }

    async obtenerEdificio(idedificio){
        const edificio = await this.Edificio.findOne({
            where:{
                id:idedificio
            },
            include: this.Ubicacion
        });
        if(!edificio){
            throw ApiError.badRequestError("El edificio no existe");
        }
        return edificio;
    }

    async actualizarEdificio(idedificio,datos){
        const edificio = await this.getEdificio(idedificio);
        await edificio.update(datos);
    }

    async edificiosBusqueda(size,page,filter){
        const offset = (size)*(page-1);
        return await this.Edificio.findAndCountAll({
            where:{
                [Op.or]: [
                    {
                        direccion: {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        nombre: {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        telefono: {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    }
                ]
            },
            limit: size,
            offset: offset
        });
    }

    async edificiosPaginacion(size,page){
        let offset = (size)*(page-1);
        return await this.Edificio.findAndCountAll({
            limit: size,
            offset: offset,
        });
    }

}

module.exports = EdificiosService;