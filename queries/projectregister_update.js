const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const projecRegisterUpdate = async (project) => {
    try {
        const result = await connection('dbo.projectregister')
            .where('projectid', '=', project[1])
            .update({
                createdon:                  prepareString(project[0])
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
            });
    
        log('projectregister', 'UPDATE', project[1]);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = projecRegisterUpdate;