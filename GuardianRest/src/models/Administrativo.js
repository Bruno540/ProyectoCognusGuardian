const Sequelize = require("sequelize");

const Administrativo = {};

Administrativo.atributos = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
    references: { model: 'usuario', key: 'id' }
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
}

Administrativo.opciones = {
  tableName: 'administrativo',
  hooks: {
    beforeBulkCreate: async (instances, options)=>{
      const usuarios = options.usuarios;
      const Usuario = options.usermodel;
      const admins = await Usuario.bulkCreate(usuarios, {individualHooks: true, transaction: options.transaction});
      admins.forEach((user,index)=>{
        instances[index].id=user.id;
      });
    },
    beforeCreate: async (admin, options) => {
      let datos = options.datos;
      const Usuario = options.model;
      const usuario = await Usuario.create(datos,{creator: options.creator, transaction: options.transaction});
      admin.id=usuario.id;
    },
    beforeUpdate: async (user,options) => {
      const id = user.id;
      const datos = options.datos;
      const Usuario = await user.getUsuario();
      await Usuario.update(datos,{
        where:{
          id
        },
        creator: options.creator
      });
    },
    afterDestroy: async(user, options) =>{
     // await admin.reload();
     const usuario = await user.getUsuario();
     await usuario.destroy({
       creator: options.creator,
       transaction: options.transaction
     });
    }
  },
  defaultScope: {
    order: [['id', 'ASC']],
  }
}

module.exports = Administrativo;



