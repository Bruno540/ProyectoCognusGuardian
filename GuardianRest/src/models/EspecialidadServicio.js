const Sequelize = require('sequelize');

const EspecialidadServicio = {};

EspecialidadServicio.atributos = {
    idespecialidad: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: 'especialidad', key: 'id' }
    },
    idservicio: {
      type: Sequelize.STRING,
      primaryKey: true,
      references: { model: 'servicio', key: 'idservicio' },
    },
    cant_medicos:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }

EspecialidadServicio.opciones = { 
  tableName: 'especialidadservicio'
};

module.exports=EspecialidadServicio;


