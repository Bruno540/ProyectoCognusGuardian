const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");

class ZonasService {
  
    constructor (schema) {
       this.seq = selectSchema(schema);
       this.Zona = this.seq.models.Zona;
       this.ServicioDomicilio = this.seq.models.ServicioDomicilio;
    }

    async obtenerZonas(){
        return await this.Zona.findAll();
    }

    async crearZona(pais,departamento,localidad){
        const zonaCreada = await this.Zona.create({
            pais: pais,
            departamento: departamento,
            localidad:localidad
        });
        return !!zonaCreada;
    }

    async obtenerZonasPaginacion(size,page){
        let offset = (size)*(page-1);
        return await this.Zona.findAndCountAll({
            limit: size,
            offset: offset,
        });
    }

    async obtenerZonasBusqueda(size,page,filter){
        let offset = (size)*(page-1);
        return await this.Zona.findAndCountAll({
            where:{
                [Op.or]: [
                    {
                        pais: {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        departamento: {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        localidad: {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    }
                ]
            },
            limit: size,
            offset: offset,
        });
    }

    async actualizarZona(id,datos){
        const zona = await this.Zona.findByPk(id);
        if(!zona){
            throw ApiError.badRequestError("La zona no existe");
        }
        return !!await this.Zona.update(datos,{
            where:{
                id
            }
        });
    }

    async eliminarZona(id){
        const servicioDomicilio = await this.ServicioDomicilio.findOne({
            where:{
                idzona: id
            },
        })
        if(servicioDomicilio){
            throw ApiError.badRequestError("La zona esta asignada a un servicio");
        }
        else{
            return await this.Zona.destroy({
                where:{
                    id
                }
            }) !== 0;
        }
    }
}

module.exports = ZonasService;