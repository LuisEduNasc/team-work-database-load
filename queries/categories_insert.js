const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const categoriesInsert = async (category) => {
    try {
        const result = await connection('dbo.categories')
            .insert({
                parentid: prepareString(category['parent-id']),
                name: prepareString(category.name),
                count: prepareString(category.count),
                elementscount: prepareString(category['elements-count']),
                id: prepareString(category.id),
                color: prepareString(category.color),
                type: prepareString(category.type)
            })
        
        log('categories', 'INSERT', category.id);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = categoriesInsert;