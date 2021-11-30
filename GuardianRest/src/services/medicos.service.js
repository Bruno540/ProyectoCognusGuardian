const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");

class MedicosService {
  
    constructor (schema) {
        this.seq = selectSchema(schema);
        this.Guardia = this.seq.models.Guardia;
        this.GuardiaMedico = this.seq.models.GuardiaMedico;
        this.GuardiaMedicoPostulacion = this.seq.models.GuardiaMedicoPostulacion;
        this.Medico = this.seq.models.Medico;
        this.EspecialidadMedico = this.seq.models.EspecialidadMedico;
        this.Usuario = this.seq.models.Usuario;
        this.Especialidad = this.seq.models.Especialidad;
        this.Zona = this.seq.models.Zona;
    }


    async agregarMedico(datosUsuario, datosMedico, file,especialidades, creator) {
        await this.seq.transaction().then(async t => {
            let especialidad;
            let rutaFoto = "uploads/default.png";
            if(file){
                rutaFoto = "uploads/" + file.filename;
            }
            datosMedico.rutaFoto = rutaFoto;
            const zona = await this.Zona.findByPk(datosMedico.idzona);
            if(!zona){
                throw ApiError.badRequestError("La zona indicada no existe");
            }
            await this.Medico.create(datosMedico,{
                datos: {
                    datos: datosUsuario,
                    model: this.Usuario,
                },
                creator,
                transaction:t
            }).then(async medico=>{
                if(!especialidades){
                    especialidades=[]
                }
                especialidad = await this.Especialidad.findAll({
                    where:{
                        [Op.or]:[
                            {
                                id:especialidades
                            },
                            {
                                nombre: 'Medicina General'
                            }
                        ]
                    }
                });
                await medico.setEspecialidads(especialidad, {transaction:t});
                t.commit();
            }).catch(()=>{
                t.rollback();
            })
        });
    }

    async obtenerMedicos() {
        return await this.Medico.findAll({
            include: this.Usuario
        });
    }

    async getMedico(id){
        const medico = await this.Medico.findByPk(id);
        if(!medico){
            throw ApiError.badRequestError("El medico no existe");
        }
        return medico;
    }

    async obtenerGuardias(id){
        const medico = await this.getMedico(id)
        return await medico.getGuardia();
    }

    async obtenerMedico(id){
        const medico  =await this.Medico.findByPk(id,{
            include:[
                {
                    model: this.Usuario
                },
                {
                    through: {
                        model: this.EspecialidadMedico
                    },
                    model: this.Especialidad,
                }
            ]
        })
        if(!medico){
            throw ApiError.badRequestError("El medico no existe");
        }
        return medico;
    }

    async eliminarMedico(id, creator){
        const medico = await this.getMedico(id);
        const asignaciones = await medico.getAsignacion();
        const postulaciones = await medico.getPostulacion()
        if( asignaciones.length === 0 && postulaciones.length === 0 ){
            await this.seq.transaction().then(async t => {
                try{
                    await medico.setEspecialidads(null,{ transaction: t });
                    await medico.destroy({creator,transaction: t});
                    await t.commit();
                }
                catch(err){
                    await t.rollback();
                    throw err;
                }
            });
        }else{
            throw ApiError.badRequestError("El medico ya tiene postulaciones registradas en el sistema"); 
        }
        
    }

    async actualizarMedico(idmedico,datosMedico,datosUsuario,file, creator){
        let rutaFoto;
        if(file){
            rutaFoto = "uploads/" + file.filename;
        }
        await this.seq.transaction().then(async t => {
            try{
                const medico = await this.getMedico(idmedico);
                await medico.update({
                    direccion: datosMedico.direccion,
                    fecha_nac: datosMedico.fecha_nac,
                    rutaFoto
                }, {
                    datos: datosUsuario,
                    model: this.Usuario,
                    creator,
                    transaction: t
                });
                await t.commit();
            }
            catch(err){
                await t.rollback();
                throw err;
            }
        });
    }

    async medicosPaginacion(size,page){
        let offset = (size)*(page-1);
        return await this.Medico.findAndCountAll({
            limit: size,
            offset: offset,
            include: [
                {
                    model: this.Usuario
                }
            ]
        });
    }

    async medicosBusqueda(size, page, filter){
        let offset = (size)*(page-1);
        return await this.Medico.findAndCountAll({
            where:{
                [Op.or]: [
                    {
                        direccion: {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        '$Usuario.email$': {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        '$Usuario.telefono$': {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        '$Usuario.nombre$': {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        '$Usuario.apellido$': {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    }
                ]
            },
            limit: size,
            offset: offset,
            include: [
                {
                    model: this.Usuario
                }
            ]
        });
    }

    async agregarEspecialidadesMedico(idmedico, especialidades){
        const medico = await this.getMedico(idmedico);
        if(!especialidades || especialidades.length === 0){
            throw ApiError.badRequestError("Debe ingresar al menos una especialidad");
        }
        const especialidad = await this.Especialidad.findAll({
            where:{
                id:especialidades
            }
        });
        if(especialidad.length!==especialidades.length){
            throw ApiError.badRequestError("Especialidades incorrectas");
        }
        await medico.addEspecialidads(especialidad);
    }

    async quitarEspecialidadMedico(idmedico, especialidad){
        const medico = await this.getMedico(idmedico);
        if(!medico){
            throw ApiError.badRequestError("No existe el medico");
        }
        const esp = await this.Especialidad.findByPk(especialidad);
        if(!esp){
            throw ApiError.badRequestError("No existe la especialidad");
        }
        const ckAsignacion = await this.GuardiaMedico.findOne({
            where:{
                idmedico,
                especialidad
            }
        });
        if(ckAsignacion){
            throw ApiError.badRequestError("El medico ya tiene asignaciones con esa especialidad");
        }
        const ckPostulacion = await this.GuardiaMedicoPostulacion.findOne({
            where:{
                idmedico,
                especialidad
            }
        });
        if(ckPostulacion){
            throw ApiError.badRequestError("El medico ya tiene postulaciones con esa especialidad");
        }
        await this.EspecialidadMedico.destroy({
            where:{
                idmedico,
                idespecialidad: especialidad
            }
        });
    }

}

module.exports = MedicosService;