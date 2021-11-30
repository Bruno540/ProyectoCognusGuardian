const Sequelize = require('sequelize');

const Especialidad = {};

Especialidad.atributos = {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true 
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
}

Especialidad.opciones = {
  tableName: 'especialidad',
};

module.exports=Especialidad;


