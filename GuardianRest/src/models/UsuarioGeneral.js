const Sequelize = require("sequelize");
const { sequelize } = require('../database/database');

const UsuarioGeneral = sequelize.define('UsuarioGeneral', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
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
  password: {
    type: Sequelize.STRING
  },
  institucion:{
    type: Sequelize.STRING
  },
  tipo:{
    type: Sequelize.STRING
  }
}, {
    tableName: 'usuariosgeneral',
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      password:{
        attributes: { include: ['password'] }
      }
    }
});
UsuarioGeneral.sync = () => Promise.resolve();

module.exports = UsuarioGeneral;



