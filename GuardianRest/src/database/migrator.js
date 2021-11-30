const { Umzug, memoryStorage } = require('umzug');
const Sequelize = require('sequelize');

const getMigrator = (sequelize)=>{
    return new Umzug({
        context: sequelize.getQueryInterface(),
        migrations: { 
            glob: 'migrations/*.js' ,
            resolve: ({ name, path, context }) => {
                const migration = require(path || '')
                return {
                    name,
                    up: async () => migration.up(context, Sequelize),
                    down: async () => migration.down(context, Sequelize),
                }
            },
        },
        storage: memoryStorage(),
        logger: undefined
    });
}

module.exports = {
    getMigrator
}