const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
var crypto = require("crypto");
const { enviarEmail } = require('../services/email.service');
const saveAuditLog = require('../auth/audit/saveAuditLog');

const Usuario = {};

Usuario.atributos = {
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
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
}

Usuario.opciones = {
  tableName: 'usuario',
  hooks: {
    beforeCreate: async (user, options) => {
      var pass = await crypto.randomBytes(10).toString('hex');
      await bcrypt.hash(pass, 12).then(hash => {
        user.password = hash;
        enviarEmail(user.email, user.nombre,pass);
      })
      .catch(err => {
        console.log(err);
        throw new Error();
      });
    },
    afterCreate: async(user, options) =>{
      await saveAuditLog('create', user, options, options.creator);
      if(!options.transaction){
        await user.reload();
      }
    },
    afterUpdate: async(user, options) =>{
      await saveAuditLog('update', user, options, options.creator);
      if(!options.transaction){
        await user.reload();
      }
    },
    afterDestroy: async(user, options) =>{
      await saveAuditLog('delete', user, options, options.creator);
    }
  },
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    password:{
      attributes: { include: ['password'] }
    }
  }
};


module.exports = Usuario;



