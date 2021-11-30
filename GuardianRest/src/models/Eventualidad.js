const Sequelize = require('sequelize');

const Eventualidad = {};

Eventualidad.atributos = {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true 
  },
  idmedico: {
    type: Sequelize.INTEGER,
    references: { model: 'medico', key: 'id' }

  },
  idguardia:{
    type: Sequelize.INTEGER,
    references: { model: 'guardia', key: 'id' }
  },
  idespecialidad:{
    type: Sequelize.INTEGER,
    references: { model: 'especialidad', key: 'id' }
  },
  activa:{
    type: Sequelize.BOOLEAN,
    defaultValue: true 
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
}

Eventualidad.opciones = {
  tableName: 'eventualidad'
};

module.exports=Eventualidad;


