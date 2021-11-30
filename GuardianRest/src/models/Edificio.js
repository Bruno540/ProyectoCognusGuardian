const Sequelize = require('sequelize');
  
const Edificio = {};

Edificio.atributos = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    direccion: {
      type: Sequelize.STRING
    },
    nombre: {
      type: Sequelize.STRING
    },
    telefono:{
      type: Sequelize.STRING
    },
    rutaFoto: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
}

Edificio.opciones= {
  tableName: 'edificio',
  hooks: {
    beforeBulkCreate: async (instances)=>{
     const edificios =instances;
      edificios.forEach((edi,index)=>{
        instances[index].rutaFoto="uploads/default.png";
      });
    }
  }
};
 

module.exports=Edificio;


