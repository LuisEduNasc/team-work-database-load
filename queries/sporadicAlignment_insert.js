const utils = require('../utils');
const log = utils.logScript;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const sporadicAlignmentInsert = async (evaluation) => {
    try {
        const result = await connection('dbo.sporadicAlignment')
            .insert({	
                createdAt:	            evaluation[0]			
                ,emailEvaluator:		evaluation[1]
                ,fillDate:				evaluation[2]
                ,emailEvaluated:		evaluation[3]	
                ,comments:       		evaluation[4]
                ,classification:     	evaluation[5]              
            })
    
        log('sporadicAlignment', 'INSERT', evaluation[3]);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = sporadicAlignmentInsert;