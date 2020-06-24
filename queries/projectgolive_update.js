const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const projecGoLiveUpdate = async (project) => {
    try {
        const result = await connection('dbo.projectgolive')
            .where('projectid', '=', project[1])
            .update({
                createdon:                  prepareString(project[0])
                ,golivedate:                prepareString(project[2])
                ,projectmanagercomments:    prepareString(project[3])
                ,projectevaluationbypm:     prepareString(project[4])
                ,countrygolive:             prepareString(project[5])
                ,accountplataform:          prepareString(project[6])
                ,ownertestimonial:          prepareString(project[7])
            });
    
        log('projectgolive', 'UPDATE', project[1]);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = projecGoLiveUpdate;