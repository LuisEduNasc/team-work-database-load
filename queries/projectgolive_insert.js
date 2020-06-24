const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const projectsGoLiveInsert = async (project) => {
    try {
        const projectsId = await handleSelect('dbo.projects', prepareString(project[1]), 'projectsid');

        if(!projectsId)
            return;

        const result = await connection('dbo.projectgolive')
            .insert({
                createdon:                  prepareString(project[0])
                ,projectid:                 prepareString(project[1])
                ,golivedate:                prepareString(project[2])
                ,projectmanagercomments:    prepareString(project[3])
                ,projectevaluationbypm:     prepareString(project[4])
                ,countrygolive:             prepareString(project[5])
                ,accountplataform:          prepareString(project[6])
                ,ownertestimonial:          prepareString(project[7])
                ,projectsid:                projectsId
            })
    
        log('projectgolive', 'INSERT', project[1]);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = projectsGoLiveInsert;