require('./pgEnum-fix')

const Sequelize = require('sequelize');

// Conexion por defecto a la base de datos(schema public)
const sequelize = require('./commonDb');

sequelize.sync();

// Funcion para definir los modelos del sistema a una conexion de sequelize de forma dinamica
const { agregarModelos } = require('./defineModels');

// Mapa para almacenar las distintas conexiones a los schemas
const handlers = new Map();

// Se agrega a la lista de conexiones la conexion por defecto al schema public
handlers.set('public', sequelize);

/* 
- Con la conexion por defecto al schema public podemos conocer los distintos schemas de la bd.
- Para cada uno se va a definir una conexion de sequelize distinta y se va a almacenar en el mapa "handlers".
- Al especificar un schema en la conexion de sequelize, todas las acciones realizadas con esa conexion se van a aplicar en el schema indicado. En este caso cada schema representa una institucion por separado.
- Ademas de definir la conexion para el schema, debemos asociar los modelos de la aplicacion a esta, porque ahora al ser variables no se pueden definir en distintos archivos.
- Esto se hace con la funcion agregarModelos()
*/


async function definirConexion(esq){
    
    if(process.env.DB_SSL==="TRUE"){
        dialectOptions = {
            options: {
                useUTC: false, 
            },
            native: true,
            ssl: {
                require: true,
                rejectUnauthorized: false 
            }
        }
    }
    else{
        dialectOptions = {
            options: {
                useUTC: false, 
            }
        }
    }
    const schema =  new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
       {
            schema: esq,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            logging: false,
            dialect: 'postgres',
            typeValidation: true,
            dialectOptions,
            timezone:'-03:00',
            pool:{
                max: 5,
                min: 0,
                require: 30000,
                idle: 10000
            },
       },
    );
    await agregarModelos(schema);
    handlers.set(esq, schema);
    return schema;
}


async function definirConexiones(){
    const esquemas = await sequelize.showAllSchemas();
    for(const esq of esquemas){
        await definirConexion(esq);
    }
}

// Al inicio la aplicacion realiza todo este procedimiento
definirConexiones().then(() => console.log("Conexiones a la base de datos establecidas con exito"), err => console.log(`Error en la conexion a la base de datos: ${err}`));

// Se define la vista para el acceso  a los usuarios del sistema de forma general(Usuarios de todas las instituciones)
async function definirVista(esquemas) {
    let view = `CREATE OR REPLACE VIEW "usuariosgeneral" AS`;
    esquemas.forEach((esq,index)=>{
        if(index!==0){
            view = view + "UNION"
        }
        view = view +  ` select *, '${esq}' AS "institucion",(case when u.id in (select id from ${esq}.administrador) then 'ADMIN' when u.id in (select id from ${esq}.medico) then 'MEDICO' when u.id in (select id from ${esq}.administrativo) then 'ADMINISTRATIVO' end) as tipo from "${esq}".usuario as u `;
    });
    return view;
}

// Funcion para actualizar las vistas
async function actualizarVista(){
    sequelize.query(`DROP VIEW IF EXISTS "usuariosgeneral" `);
    const esquemas = await sequelize.showAllSchemas();
    if(esquemas.length){
        definirVista(esquemas).then(data=>{
            if(data){
                sequelize.query(data);
            }
        });
    }
    else{
        sequelize.query(`CREATE OR REPLACE VIEW "usuariosgeneral" AS select 1 as "id", CAST('email' as varchar(255)) as "email", CAST('nombre' as varchar(255)) as "nombre", CAST('apellido' as varchar(255)) as "apellido", CAST('telefono' as varchar(255)) as "telefono", CAST('institucion' as varchar(255)) as "institucion", CAST('password' as varchar(255)) as "password", CAST('tipo' as varchar(255)) as "tipo",now() as "createdAt", now() as "updatedAt"`);
    }
}

// Esta funcion es la que retorna la conexion de sequelize necesaria segun el schema indicado
function selectSchema(schema){
    return handlers.get(schema);
}

//Se crea la vista ya en el inicio del programa
actualizarVista().then(() => console.log("Lista de usuarios actualizada con exito"), err => console.log(`Error al actualizar la lista de usuarios: ${err}`));

module.exports={
    sequelize,
    actualizarVista,
    selectSchema,
    definirConexion
}