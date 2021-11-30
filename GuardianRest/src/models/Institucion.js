const Sequelize = require("sequelize");
const { sequelize } = require('../database/database');


const Institucion = sequelize.define('Institucion', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING,
    unique: true
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }

}, {
  tableName: 'institucion',
 
});
module.exports = Institucion;



