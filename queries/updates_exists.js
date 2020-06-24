const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');

const updatesExists = async (update) => {
    try {
        const result = await connection('dbo.updates')
        .where('id', update.id)
        .select('updatesId')
        .first();
        
        return result;
    } catch (error) {
        errorHandler('updates_exists.js', error);
    }
}

module.exports = updatesExists;