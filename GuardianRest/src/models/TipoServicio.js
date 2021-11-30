const Sequelize = require("sequelize");

const TipoServicio = {};

TipoServicio.atributos = {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
}
 
TipoServicio.opciones = {
  tableName: 'tiposervicio',
};


module.exports = TipoServicio;
