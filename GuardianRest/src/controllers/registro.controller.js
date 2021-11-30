const { sequelize, actualizarVista, definirConexion } = require("../database/database");
const Institucion = require("../models/Institucion");
const Suscripcion = require("../models/Suscripcion");

exports.signup = async (info) => {
    await sequelize.transaction().then(async t => {
        try{
            const suscripcion = await Suscripcion.findByPk(info.subId);
            const name = suscripcion.institucion.toLowerCase();
            const  [ response, created ]  = await Institucion.findOrCreate({
                where: {
                    nombre: name,
                },
                defaults: {
                    nombre: name,
                },
                transaction: t
            });
            if (created) {
                console.log("Registrando datos de la institucion...");
                await suscripcion.update({
                    estado: info.subStatus,
                    idinstitucion: response.id
                },{ transaction: t });
                await t.commit();
                createSchema(suscripcion, t); // function
            } 
            else {
                console.log("La institucion ya existe");
                return;
            }
        }catch(e){
            await t.rollback();
            throw e;
        }
    });
};

const createSchema = async (data) => {
    try{
        console.log("Configurando la base de datos...");
        var name = data.institucion.toLowerCase();
        await sequelize.createSchema(name);
        const schema = await definirConexion(name);
        actualizarVista();
        var Usuario = schema.models.Usuario;
        const datos = { email, nombre, apellido, telefono } = data;
        const userSchema = schema.models.Admin;
        console.log("Registrando administrador...");
        await sequelize.transaction().then(async t => {
            try{
                await userSchema.create({
                }, {
                    datos: {
                        datos,
                        name,
                        Usuario,
                    }, 
                    transaction: t
                });
                await t.commit();
                console.log("INSTITUCION REGISTRADA EN EL SISTEMA".green);
            }
            catch(err){
                await t.rollback();
                throw err;
            }
        });
    }
    catch(e){
        throw e;
    }
};