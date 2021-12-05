const Sequelize = require('sequelize');

const moment = require('moment');

const Guardia = {};

Guardia.atributos = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    descripcion: {
      type: Sequelize.STRING,
     
    },
    estado: {
      type: Sequelize.ENUM('PENDIENTE','PUBLICADA','CERRADA'),
      defaultValue: 'PENDIENTE'
    },
    fechainicio:{
        type: Sequelize.DATE,
        get(){
          return this.dataValues.fechainicio;
        }
    },
    fechafin:{
      type: Sequelize.DATE,
      get(){
        return this.dataValues.fechafin;
      }
    },
    duracion:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 8
    },
    idservicio:{
        type: Sequelize.INTEGER,
        references: { model: 'servicio', key: 'id' }
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }
  Guardia.opciones = {
    tableName: 'guardia',
    doNotSync: true,
    hooks:{
      //Cambia el estado de la guardia a cerrada cuando llegue su fecha de inicio
      async beforeCreate(guardia, options){
        console.log(dia);
        const delay = new Date(guardia.fechainicio).getTime() - new Date().getTime(); 
        if(delay<0){
          guardia.estado="CERRADA"
        }
        else{
          setTimeout(async (datos)=>{
            console.log("Voy a cerrar la guardia");
            await guardia.update({
              estado: 'CERRADA'
            });
          }, delay, guardia);
        }
      }
    }
  };

  module.exports = Guardia;