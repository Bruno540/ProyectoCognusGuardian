const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");
const Sequelize = require("sequelize");

class ServiciosService {

    constructor (schema) {
        this.seq = selectSchema(schema);
        this.Guardia = this.seq.models.Guardia;
        this.Medico = this.seq.models.Medico;
        this.Usuario = this.seq.models.Usuario;
        this.Especialidad = this.seq.models.Especialidad;
        this.Servicio = this.seq.models.Servicio;
        this.ServicioLocal = this.seq.models.ServicioLocal;
        this.ServicioDomicilio = this.seq.models.ServicioDomicilio;
        this.Zona = this.seq.models.Zona;
        this.Ubicacion = this.seq.models.Ubicacion;
        this.TipoServicio = this.seq.models.TipoServicio;
        this.Edificio = this.seq.models.Edificio;
        this.EspecialidadServicio = this.seq.models.EspecialidadServicio;
    }


    async obtenerServicios(){
        const serviciosLocal = await this.Servicio.findAll({
            include: [
                {
                    attributes: ['idedificio','idubicacion'],
                    model: this.ServicioLocal,
                    required: true,
                    as: 'Local'
                }

            ]
        });
        const serviciosDomicilio = await this.Servicio.findAll({
            include: [
                {
                    model: this.ServicioDomicilio,
                    required: true,
                    attributes: ["idzona"],
                    include: this.Zona,
                    as: 'Domicilio'
                }

            ]
        });
        return serviciosLocal.concat(serviciosDomicilio);
    }

    async obtenerServicio(idservicio){
        const servicio = await this.Servicio.findByPk(idservicio,{
            include: [
                {
                    attributes: ['idedificio','idubicacion'],
                    model: this.ServicioLocal,
                    //required: true,
                    as: 'Local',
                    include:[
                        {
                            model: this.Edificio
                        },
                        {
                            model: this.Ubicacion
                        },
                        {
                            model: this.TipoServicio
                        }
                    ]
                },
                {
                    model: this.Especialidad
                },
                {
                    model: this.ServicioDomicilio,
                    as:'Domicilio',
                    include:
                        {
                            model:this.Zona
                        }
                }
            ]
        });
        if(!servicio){
            throw ApiError.badRequestError("No existe el servicio");
        }
        return servicio;
    }

    async obtenerServiciosLocales(){
        return await this.ServicioLocal.findAll({
            attributes: ['id', 'tipo', 'idubicacion'],
            include: [
                {
                    model: this.Servicio
                },
                {
                    model: this.Edificio
                }
            ]
        });
    }

    async obtenerServiciosDomicilio(){
        return await this.ServicioDomicilio.findAll({
            include: [
                {
                    model: this.Servicio
                },
                {
                    model: this.Zona
                }
            ]
        });
    }

    async obtenerServiciosZona(idzona){
        return await this.ServicioDomicilio.findAll({
            where:{
                idzona
            },
            include: {
                model: this.Servicio
            }
        });
    }


    async agregarServicioLocal(datosServicioLocal, especialidades){
        const edificio = await this.Edificio.findByPk(datosServicioLocal.idedificio);
        if(!edificio){
            throw ApiError.badRequestError("No existe el edificio");
        }
        const ubicacion = await this.Ubicacion.findOne({
            where:{
                id:datosServicioLocal.idubicacion,
                idedificio: datosServicioLocal.idedificio
            }
        });
        if(!ubicacion){
            throw ApiError.badRequestError("No existe la ubicacion en el edificio seleccionado");
        }
        for (const esp of especialidades) {
            if(!(await this.Especialidad.findByPk(esp.idespecialidad))){
                throw ApiError.badRequestError("No se encontro alguna de las especialidades seleccionadas");
            }
        }
        const servicioTest  = await this.ServicioLocal.findOne({
            where:{
                idedificio: datosServicioLocal.idedificio,
                idubicacion: datosServicioLocal.idubicacion
            }
        });
        if(servicioTest){
            throw ApiError.badRequestError("La ubicacion seleccionada ya esta ocupada por otro servicio");
        }
        await this.seq.transaction().then(async t => {
            try{
                const servicio = await this.ServicioLocal.create(datosServicioLocal,{
                    model: this.Servicio,
                    transaction: t
                });
                for(const esp of especialidades){
                    await this.EspecialidadServicio.create({
                        idespecialidad: esp.idespecialidad,
                        idservicio: servicio.id,
                        cant_medicos: esp.cantidad
                    },{
                        transaction: t
                    });
                }
                await t.commit();
                return servicio;
            }
            catch(err){
                await t.rollback();
                throw err;
            }
        });
    }

    async getServicioLocal(id){
        const serviciolocal = await this.ServicioLocal.findOne({
            where:{
                id
            },
        });
        if(!serviciolocal){
            throw ApiError.badRequestError("El servicio no existe");
        }
        return serviciolocal;
    }

    async getServicioLocalDomicilio(id){
        const servicio = await this.ServicioDomicilio.findOne({
            where:{
                id
            },
        });
        if(!servicio){
            throw ApiError.badRequestError("El servicio no existe");
        }
        return servicio;
    }

    async actualizarServicioLocal(id, datosServicio,  datosServicioLocal){
        const serviciolocal = await this.getServicioLocal(id);
        await serviciolocal.update({
            datosServicioLocal
        }, {
            datos: datosServicio,
            model: this.Servicio
        });
    }

    async agregarServicioDomicilio(idzona, especialidades){
        const zona = await this.Zona.findByPk(idzona);
        if(!zona){
            throw ApiError.badRequestError("No existe la zona");
        }
        for (const esp of especialidades) {
            if(!(await this.Especialidad.findByPk(esp.idespecialidad))){
                throw ApiError.badRequestError("No se encontro alguna de las especialidades seleccionadas");
            }
        }
        await this.seq.transaction().then(async t => {
            try{    
                const servicio = await this.ServicioDomicilio.create({
                    idzona
                },{
                    model: this.Servicio,
                    transaction: t
                });
                for(const esp of especialidades){
                    await this.EspecialidadServicio.create({
                        idespecialidad: esp.idespecialidad,
                        idservicio: servicio.id,
                        cant_medicos: esp.cantidad
                    },{
                        transaction: t
                    });
                }
                await t.commit();
                return servicio;
            }
            catch(err){
                await t.rollback();
                throw err;
            }
        });

      
    }

    async servicioLocalPaginacion(size,page){
        let offset = (size)*(page-1);
        return await this.ServicioLocal.findAndCountAll({
            order:[['id', 'ASC']],
            attributes: ['id', 'idubicacion'],
            limit: size,
            offset: offset,
            include: [
                {
                    model: this.Servicio
                },
                {
                    model: this.Edificio
                },
                {
                    model: this.TipoServicio
                },
                {
                    model: this.Ubicacion,
                    on: {
                        col1: Sequelize.where(Sequelize.col("ServicioLocal.idubicacion"), "=", Sequelize.col("Ubicacion.id")),
                        col2: Sequelize.where(Sequelize.col("ServicioLocal.idedificio"), "=", Sequelize.col("Ubicacion.idedificio"))
                    },
                }
            ]
        });
    }

    async servicioDomicilioPaginacion(size, page){
        let offset = (size)*(page-1);
        return await this.ServicioDomicilio.findAndCountAll({
            order:[['id', 'ASC']],
            attributes: ['id', 'idzona'],
            limit: size,
            offset: offset,
            include: [
                {
                    model: this.Servicio
                },
                {
                    model: this.Zona
                }
            ]
        });
    }

    async getServicio(id){
        const servicio = await this.Servicio.findByPk(id);
        if(!servicio){
            throw ApiError.badRequestError("El servicio no existe");
        }
        return servicio;
    }

    async obtenerGuardiasServicio(id){
        const servicio = await this.getServicio(id);
        return  await servicio.getGuardia();
    }

    async obtenerGuardiasServicioPaginacion(id,size,page){
        let offset = (size)*(page-1);
        const servicio = await this.getServicio(id);
        const count = await servicio.countGuardia();
        const guardias = await servicio.getGuardia({
            limit: size,
            offset: offset,
        });
        return  {
            count,
            guardias
        }
    }

    async servicioLocalBusqueda(size,page,filter){
        let offset = (size)*(page-1);
        return await this.ServicioLocal.findAndCountAll({
            where:{
                [Op.or]: [
                    {
                        '$TipoServicio.nombre$': {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        '$Edificio.nombre$': {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        '$Ubicacion.descripcion$': {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                ]
            },
            limit: size,
            offset: offset,
            include:[
                {
                    model: this.TipoServicio,
                },
                {
                    model: this.Edificio
                },
                {
                    model: this.Ubicacion
                }
            ]
        });
    }

    async servicioLocalGuardiasBusqueda(id, filter,size, page){
        let offset = (size)*(page-1);
        const servicio = await this.getServicio(id);
        const options = {
            where:{
                descripcion: {
                    [Op.iLike]: '%' + filter + '%'
                }
            }
        }
        const count = await servicio.countGuardia({where:options.where});
        const guardias = await servicio.getGuardia({
            where:options.where,
            limit: size,
            offset: offset,
        });
        return {
            count,
            guardias
        }
    }

    async eliminarServicioLocal(id){
        const servicioLocal = await this.getServicioLocal(id);
        const servicio = await this.getServicio(id)
        const guardias = await servicio.getGuardia();
        if( guardias.length === 0 ){
            await this.seq.transaction().then(async t => {
                try{
                    await servicioLocal.destroy({transaction: t});
                    await t.commit();
                }
                catch(err){
                    await t.rollback();
                    throw err;
                }
            });
        }
        else{
            throw ApiError.badRequestError("El servicio ya tiene guardias creadas"); 
        }
    }

    async eliminarServicioDomicilio(id){
        const servicioDom = await this.getServicioLocalDomicilio(id);
        const servicio = await this.getServicio(id)
        const guardias = await servicio.getGuardia();
        if( guardias.length === 0 ){
            await this.seq.transaction().then(async t => {
                try{
                    await servicioDom.destroy({transaction: t});
                    await t.commit();
                }
                catch(err){
                    await t.rollback();
                    throw err;
                }
            });
        }
        else{
            throw ApiError.badRequestError("El servicio ya tiene guardias creadas"); 
        }
    }
}

module.exports = ServiciosService;