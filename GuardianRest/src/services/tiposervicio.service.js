const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");

class TipoServicioService {

    constructor (schema) {
        this.seq = selectSchema(schema);
        this.TipoServicio = this.seq.models.TipoServicio;
        this.ServicioLocal = this.seq.models.ServicioLocal;
    }

    async agregarTipo(nombre){
        return !! await this.TipoServicio.create({
            nombre: nombre,
        });
    }

    async obtenerTiposPaginacion(size,page){
        let offset = (size)*(page-1);
        return await this.TipoServicio.findAndCountAll({
            limit: size,
            offset: offset,
        });
    }

    async obtenerTiposBusqueda(size,page,filter){
        let offset = (size)*(page-1);
        return await this.TipoServicio.findAndCountAll({
            where:{
                [Op.or]: [
                    {
                        nombre: {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    }
                ]
            },
            limit: size,
            offset: offset,
        });
    }

    async getTipo(idtipo){
        const tiposervicio = await this.TipoServicio.findByPk(idtipo);
        if(!tiposervicio){
            throw ApiError.badRequestError("El tipo de servicio no existe");
        }
        return tiposervicio;
    }

    async actualizarTipoServicio(id,nombre){
        const tiposervicio = await this.getTipo(id);
        if(!tiposervicio){
            throw ApiError.badRequestError("No existe el tipo de servicio indicado");
        }
        await tiposervicio.update({
            nombre,
        });
    }

    async eliminarTipoServicio(id){
        const servicioLocal = await this.ServicioLocal.findOne({
            where:{
                idtipo: id
            },
        })
        if(servicioLocal){
            throw ApiError.badRequestError("El tipo de servicio esta asignado a un servicio");
        }
        else{
            const tiposervicio = await this.getTipo(id);
            await tiposervicio.destroy();
        }
    }

    async obtenerTipos(){
        return await this.TipoServicio.findAll();
    }
    
}

module.exports = TipoServicioService;