const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const tagsInsert = async (tag) => {
    try {
        const result = await connection('dbo.tags')
        .insert({
            name: prepareString(tag.name)
            ,dateupdated: prepareString(tag.dateUpdated)
            ,id: prepareString(tag.id)
            ,datecreated: prepareString(tag.dateCreated)
            ,projectid: prepareString(tag.projectId)
            ,color: prepareString(tag.color)
        });
    
        log('tags', 'INSERT', tag.id);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = tagsInsert;