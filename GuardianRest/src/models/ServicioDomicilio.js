const Sequelize = require('sequelize');

const ServicioDomicilio = {};

ServicioDomicilio.atributos =  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: { model: 'servicio', key: 'id' }
    },
    idzona: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'zona', key: 'id' }
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}

ServicioDomicilio.opciones = {
    tableName: 'serviciodomicilio',
    hooks:{
        async beforeCreate(servicio, options){
            const Servicio = options.model;
            const service = await Servicio.create({},{
                transaction: options.transaction
            });
            servicio.id=service.id;
        },
        afterDestroy: async(serviciodom, options) =>{
         const servicio = await serviciodom.getServicio();
         await servicio.destroy({
             transaction: options.transaction
         });
        } 
    },
  };
  
  module.exports=ServicioDomicilio;
