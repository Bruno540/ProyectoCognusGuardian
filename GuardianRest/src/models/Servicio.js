const Sequelize = require('sequelize');

const Servicio = {};

Servicio.atributos = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }
  
  Servicio.opciones = {
    tableName: 'servicio',
  };
  

  module.exports=Servicio;
