const Sequelize = require('sequelize');
const Guardia = require('./Guardia');

const GuardiaMedico = {};

GuardiaMedico.atributos = {
    idmedico: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: 'medico', key: 'id' }
    },
    idguardia: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: 'guardia', key: 'id' }
    },
    estado:{
      type: Sequelize.ENUM('ASIGNADA','CANCELADA','LIBERACION'),
      defaultValue: 'ASIGNADA'
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    },
    especialidad:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'especialidad', key: 'id' }
    }
  }
  
GuardiaMedico.opciones = {
  tableName: 'guardiamedicoasignacion'
};



module.exports=GuardiaMedico;


