const Sequelize = require('sequelize');

const ServicioLocal = {};

ServicioLocal.atributos = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        references: { model: 'servicio', key: 'id' }
    },
    idtipo: {
      type: Sequelize.INTEGER,
      references: { model: 'tiposervicio', key: 'id' }
      
    },
    idedificio:{
        type: Sequelize.INTEGER,
        references: { model: 'edificio', key: 'id' },
        allowNull:false
    },
    idubicacion:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}

ServicioLocal.opciones = {
    tableName: 'serviciolocal',
    hooks:{
        async beforeCreate(servicio, options){
            const Servicio = options.model;
            const service = await Servicio.create({},{transaction: options.transaction});
            servicio.id=service.id;
        } ,
        afterDestroy: async(servicioLocal, options) =>{
         const servicio = await servicioLocal.getServicio();
         await servicio.destroy({transaction: options.transaction})
        } 
    },
  };

  module.exports=ServicioLocal;
