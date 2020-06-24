const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const categoriesUpdate = async (category) => {
    try {
        const result = await connection('dbo.categories')
            .where('id', '=', category.id)
            .update({
                parentid: prepareString(category['parent-id']),
                name: prepareString(category.name),
                count: prepareString(category.count),
                elementscount: prepareString(category['elements-count']),
                color: prepareString(category.color),
                type: prepareString(category.type)
            });
    
        log('categories', 'UPDATE', category.id);
        
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = categoriesUpdate;