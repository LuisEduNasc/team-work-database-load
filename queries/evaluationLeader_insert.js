const utils = require('../utils');
const log = utils.logScript;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const evaluationLeaderInsert = async (evaluation) => {
    try {
        const result = await connection('dbo.evaluationLeader')
            .insert({	
                createdAt:	            evaluation[0]			
                ,emailEvaluator:		evaluation[1]
                ,fillDate:				evaluation[2]
                ,emailEvaluated:		evaluation[3]	
                ,courage:       		evaluation[4]
                ,determination:     	evaluation[5]
                ,inovation: 			evaluation[6]
                ,agility:  				evaluation[7]
                ,collaboration:			evaluation[8]
                ,leadership:    		evaluation[9]   
                ,comments:              evaluation[10]
                ,classification:        evaluation[11]             
            })
    
        log('evaluationLeader', 'INSERT', evaluation[3]);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = evaluationLeaderInsert;