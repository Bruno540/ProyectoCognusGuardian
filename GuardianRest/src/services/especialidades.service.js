const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");

class EspecialidadesService {

    constructor (schema) {
        this.seq = selectSchema(schema);
        this.Especialidad = this.seq.models.Especialidad;
        this.EspecialidadServicio = this.seq.models.EspecialidadServicio;
        this.EspecialidadMedico = this.seq.models.EspecialidadMedico;
    }

    async obtenerEspecialidades() {
        return await this.Especialidad.findAll();
    }

    async agregarEspecialidad(datos){
        return !!this.Especialidad.create(datos);
    }

    async eliminarEspecialidad(id){
        const ckEspMedico = await this.EspecialidadMedico.findOne({
            where:{
                idespecialidad: id
            }
        });
        if(ckEspMedico){
            throw ApiError.badRequestError("La especialidad esta asignada a un medico");
        }
        const ckEspServicio = await this.EspecialidadServicio.findOne({
            where:{
                idespecialidad: id
            }
        });
        if(ckEspServicio){
            throw ApiError.badRequestError("La especialidad esta asignada a un servicio");
        }
        return await this.Especialidad.destroy({
            where:{
                id
            }
        })!==0;
    }

    async actualizarEspecialidad(id,datos){
        return await this.Especialidad.update(datos,{
            where:{
                id
            }
        });
    }

    async especialidadPaginacion(size,page){
        let offset = (size)*(page-1);
        return await this.Especialidad.findAndCountAll({
            limit: size,
            offset: offset,
        });
    }

    async especialidadBusqueda(size,page,filter){
        const offset = (size)*(page-1);
        return await this.Especialidad.findAndCountAll({
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
}

module.exports = EspecialidadesService;