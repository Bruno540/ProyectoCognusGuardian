const Sequelize = require('sequelize');

const Ubicacion = {};

Ubicacion.atributos = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true 
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notEmpty: true 
      }
    },
    idedificio:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'edificio', key: 'id' }
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
}

Ubicacion.opciones = {
  tableName: 'ubicacion'
};

module.exports=Ubicacion;


