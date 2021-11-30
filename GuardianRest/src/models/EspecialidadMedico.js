const Sequelize = require('sequelize');

const EspecialidadMedico = {};

EspecialidadMedico.atributos = {
  idespecialidad: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: { model: 'especialidad', key: 'id' }
  },
  idmedico: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: { model: 'medico', key: 'id' }
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
}

EspecialidadMedico.opciones = {
  tableName: 'especialidadmedico'
};

module.exports=EspecialidadMedico;


