const Sequelize = require('sequelize');

const GuardiaMedicoPostulacion = {};

GuardiaMedicoPostulacion.atributos = {
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
      type: Sequelize.ENUM('PENDIENTE','ACEPTADA','RECHAZADA','CANCELADA'),
      defaultValue: 'PENDIENTE'
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
    },
    ponderacion:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }
  
  GuardiaMedicoPostulacion.opciones = {
    tableName: 'guardiamedicopostulacion'
  };

  

module.exports=GuardiaMedicoPostulacion;


