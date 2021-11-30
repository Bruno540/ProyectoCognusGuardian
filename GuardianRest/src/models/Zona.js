const Sequelize = require("sequelize");

const Zona = {};

Zona.atributos = {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  pais: {
    type: Sequelize.STRING
  },
  departamento: {
    type: Sequelize.STRING
  },
  localidad: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
      type: Sequelize.DATE
  }
}
Zona.opciones =  {
  tableName: 'zona',
}

module.exports = Zona;
