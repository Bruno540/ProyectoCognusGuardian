const Sequelize = require('sequelize');

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
    met_asignacion:{
      type: Sequelize.ENUM('LISTA','DIFUSION'),
      allowNull: false,
      defaultValue: "LISTA"
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
      //Cambia el estado de la guardia a cerrado una semana antes de su inicio para que no se acepten mas postulaciones
      async beforeCreate(guardia, options){
        console.log(semana);
        const fechaResultado = new Date(guardia.fechainicio).getTime() - semana;
        const delay = fechaResultado - new Date().getTime();
        setTimeout(async (datos)=>{
          await options.model.update({
            estado: 'CERRADA'
          },{
            where:{
              id: guardia.id
            }
          });
        }, delay, guardia);
      }
    }
  };

  module.exports = Guardia;