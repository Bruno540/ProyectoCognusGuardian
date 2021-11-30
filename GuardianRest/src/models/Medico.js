const Sequelize = require("sequelize");

const Medico = {};

Medico.atributos = {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true ,
    references: { model: 'usuario', key: 'id' }
  },
  direccion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fecha_nac: {
    type: Sequelize.DATE
  },
  rutaFoto: {
    type: Sequelize.STRING
  },
  idzona: {
    type: Sequelize.INTEGER,
    references: { model: 'zona', key: 'id' }
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
}

Medico.opciones = {
  tableName: 'medico',
  hooks: {
    beforeBulkCreate: async (instances, options)=>{
      const usuarios = options.usuarios;
      const Usuario = options.usermodel;
      const medicos=  await Usuario.bulkCreate(usuarios, {individualHooks: true, transaction: options.transaction});
      medicos.forEach((user,index)=>{
        instances[index].id=user.id;
        instances[index].rutaFoto="uploads/default.png";
      });
    },
    beforeCreate: async (user, options) => {
      let datos = options.datos.datos;
      const Usuario = options.datos.model;
      const usuario = await Usuario.create({
        email: datos.email,
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono
      },{
        transaction: options.transaction,
        creator: options.creator
      });
      user.id=usuario.id;
    },
    beforeUpdate: async (user,options) => {
      const id = user.id;
      let datos = options.datos;
      const Usuario = await user.getUsuario();
      await Usuario.update({
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono
      },{
        creator: options.creator,
        transaction: options.transaction
      });
    },
    afterDestroy: async(user, options) =>{
     const usuario = await user.getUsuario();
     await usuario.destroy({creator: options.creator, transaction: options.transaction})
    }
  },
  defaultScope: {
    order: [['id', 'ASC']],
  }
};


module.exports = Medico;