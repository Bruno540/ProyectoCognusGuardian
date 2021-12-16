const Sequelize = require('sequelize');
  
const CalendarToken = {};

CalendarToken.atributos = {
    access_token: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    refresh_token: {
      type: Sequelize.STRING
    },
    scope: {
      type: Sequelize.STRING
    },
    token_type:{
      type: Sequelize.STRING
    },
    expiry_date: {
      type: Sequelize.BIGINT
    },
    idmedico:{
        type: Sequelize.INTEGER,
        references: { model: 'medico', key: 'id' }
    }
}

CalendarToken.opciones= {
  tableName: 'calendartoken',
  timestamps: false
};
 

module.exports=CalendarToken;


