const Sequelize = require("sequelize");
const { sequelize } = require('../database/database');
const Institucion = require("./Institucion");


const Suscripcion = sequelize.define('Suscripcion', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING
  },
  nombre: {
    type: Sequelize.STRING
  },
  apellido: {
    type: Sequelize.STRING
  },
  telefono: {
    type: Sequelize.STRING
  },
  institucion: {
    type: Sequelize.STRING
  },
  idinstitucion: {
    type: Sequelize.INTEGER
  },
  estado:{
    type: Sequelize.ENUM('APPROVAL_PENDING','APPROVED','ACTIVE','SUSPENDED','CANCELLED','EXPIRED'),
    defaultValue: "APPROVAL_PENDING"
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
}, {
  tableName: 'suscripcion',
});

Institucion.hasMany(Suscripcion,  {foreignKey: 'idinstitucion'});
Suscripcion.belongsTo(Institucion,  {foreignKey: 'idinstitucion'});

module.exports = Suscripcion;
