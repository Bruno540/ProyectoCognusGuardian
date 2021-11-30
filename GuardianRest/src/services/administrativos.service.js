const {selectSchema} = require("../database/database");
const {Op} = require("sequelize");
const ApiError = require("../helpers/api.error");

class AdministrativosService {

    constructor (schema) {
        this.seq = selectSchema(schema);
        this.Administrativo = this.seq.models.Administrativo;
        this.Usuario = this.seq.models.Usuario;
    }


    async obtenerAdminisrativos(){
        return await this.Administrativo.findAll({
            include: this.Usuario
        });
    }

    async agregarAdministrativo(datos, creator){
        return await this.seq.transaction().then(async t => {
            return await this.Administrativo.create({
            },{
                datos,
                model: this.Usuario,
                creator: creator,
                transaction: t
            }).then(admin=>{
                t.commit();
                return true
            }).catch((err)=>{
                console.log(err);
                t.rollback();
            })
        });
    }

    async administrativoPaginacion(size, page){
        let offset = (size)*(page-1);
        return await this.Administrativo.findAndCountAll({
            limit: size,
            offset: offset,
            include: this.Usuario
        });
    }

    async administrativosBusqueda(size, page, filter){
        let offset = (size)*(page-1);
        return await this.Administrativo.findAndCountAll({
            where:{
                [Op.or]: [
                    {
                        '$Usuario.telefono$': {
                            [Op.iLike]: '%' + filter + '%'
                        }
                    },
                    {
                        '$Usuario.email$': {
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
            include: this.Usuario
        });
    }

    async actualizarAdministrativo(id,datos, creator){
        const administrativo = await this.obtenerAdministrativo(id);
        return await administrativo.update({},{
            where:{
                id
            },
            datos,
            model: this.Usuario,
            creator: creator
        });
    }

    async obtenerAdministrativo(id){
        const administrativo =  await this.Administrativo.findByPk(id,{
            include: this.Usuario
        });
        if(!administrativo){
            throw ApiError.badRequestError("El administrativo no existe");
        }
        return administrativo
    }

    async eliminarAdministrativo(id, creator){
        return await this.seq.transaction().then(async t => {
            try{
                const administrativo = await this.obtenerAdministrativo(id);
                await administrativo.destroy({
                    creator: creator,
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
}

module.exports = AdministrativosService;