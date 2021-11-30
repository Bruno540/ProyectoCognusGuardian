const Sequelize = require("sequelize");

const Admin = {};

Admin.atributos = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
    references: { model: 'usuario', key: 'id' }
  },
  createdAt:{
    type: Sequelize.DATE
  },
  updatedAt:{
    type: Sequelize.DATE
  }
}
Admin.opciones = {
  tableName: 'administrador',
  hooks: {
    beforeCreate: async (admin, options) => {
      let datos = options.datos;
      const Usuario = options.datos.Usuario;
      const usuario = await Usuario.create({
        email: datos.datos.email,
        nombre: datos.datos.nombre,
        apellido: datos.datos.apellido,
        telefono: datos.datos.telefono
      },{
        transaction: options.transaction
      });
      admin.id=usuario.id;
    },
    afterCreate: async(admin, options) =>{
      if(!options.transaction){
        await admin.reload();
      }
    }
  },
  defaultScope: {
  }
}

module.exports = Admin;



