const { sequelize } = require('../database/database');
const Sequelize = require("sequelize");

const Audit = sequelize.define('Audits', {
        user: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        actionType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        table: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        prevValues: {
            type: Sequelize.TEXT,
            allowNull: false,
            get: function() {
                return JSON.parse(this.getDataValue('prevValues'));
            },
        },
        newValues: {
            type: Sequelize.TEXT,
            allowNull: false,
            get: function() {
                return JSON.parse(this.getDataValue('newValues'));
            },
        }
    }, {
        updatedAt: false,
        tableName: 'auditlogs'
    }
);

module.exports = Audit;