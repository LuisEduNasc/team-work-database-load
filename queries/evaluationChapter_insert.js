const utils = require('../utils');
const log = utils.logScript;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const evaluationChapterInsert = async (evaluation) => {
    try {
        const result = await connection('dbo.evaluationChapter')
            .insert({	
                createdAt:	            evaluation[0]			
                ,emailEvaluator:		evaluation[1]
                ,fillDate:				evaluation[2]
                ,emailEvaluated:		evaluation[3]	
                ,analyticalAbility:		evaluation[4]
                ,technicalProeficience:	evaluation[5]
                ,organization:			evaluation[6]
                ,coaching:				evaluation[7]
                ,teamWork:				evaluation[8]
                ,customerService:		evaluation[9]	
                ,comments:				evaluation[10]
                ,classification:		evaluation[11]	                
            })
    
        log('evaluationChapter', 'INSERT', evaluation[3]);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = evaluationChapterInsert;