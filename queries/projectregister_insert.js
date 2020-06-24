const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const projectsRegisterInsert = async (project) => {
    try {
        const projectsId = await handleSelect('dbo.projects', prepareString(project[1]), 'projectsid');

        if(!projectsId)
            return;

        const result = await connection('dbo.projectregister')
            .insert({
                createdon:                  prepareString(project[0])
                ,projectid:                 prepareString(project[1])
                ,clientsegment:             prepareString(project[2])
                ,projectcategory:           prepareString(project[3])
                ,startdate:                 prepareString(project[4])
                ,expectedgolive:            prepareString(project[5])
                ,technologymigration:       prepareString(project[6])
                ,technologyused:            prepareString(project[7])
                ,projectname:               prepareString(project[8])
                ,countryproject:            prepareString(project[9])
                ,projectsubcategory:        prepareString(project[10])
                ,vtexbackground:            prepareString(project[11])
                ,accountplataform:          prepareString(project[12])
                ,projectsid:                projectsId
            })
    
        log('projectregister', 'INSERT', project[1]);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = projectsRegisterInsert;