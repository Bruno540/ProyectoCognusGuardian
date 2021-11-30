

module.exports = async function (action, model, options,userPk) {
    const Audit = require("../../models/audit");
    let id;
    try {
        id = userPk
    } catch (e) {
        id = null;
    }
    try {
        if (action == 'delete') {
            await Audit.create({
                user: id || null,
                actionType: action,
                table: model.constructor.tableName,
                prevValues: JSON.stringify(model.dataValues),
                newValues: "{}"
            },{
                transaction: options.transaction
            });
        }
        else if (model) {
            await Audit.create({
                user: id,
                actionType: action,
                table: model.constructor.tableName,
                prevValues: JSON.stringify(model._previousDataValues),
                newValues: JSON.stringify(model.dataValues),
            },{
                transaction: options.transaction
            });
        }
    } catch (e) {
        console.error(`Fail to register log for the table ${model.model.name}`)
    }
}