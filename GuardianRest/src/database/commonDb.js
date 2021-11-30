const Sequelize = require('sequelize');

let dialectOptions = {}

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

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
   {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: false,
        dialect: 'postgres',
        typeValidation: true,
        dialectOptions,
        timezone:'+03:00',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
   },
)

module.exports=sequelize;