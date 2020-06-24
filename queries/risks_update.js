const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const risksUpdate = async (risk) => {
    try {
        const projectsId = await handleSelect('dbo.projects', risk.projectId ? risk.projectId : null, 'projectsId');
        const companiesId = await handleSelect('dbo.companies', risk.companyId ? risk.companyId : null, 'companiesId');
        const peopleCreatorId = await handleSelect('dbo.people', risk.createdByUserId ? risk.createdByUserId : null, 'peopleId');
        const peopleChangedId = await handleSelect('dbo.people', risk.lastChangedByUserId ? risk.lastChangedByUserId : null, 'peopleId');

        const result = await connection('dbo.risks')
        .where('id', '=', risk.id)
        .update({
             lastchangedon                  :prepareString(risk.lastChangedOn)
            ,impact                        :prepareString(risk.impact)
            ,impactschedule                :prepareString(risk.impactSchedule)
            ,impactvalue                   :prepareString(risk.impactValue)
            ,status                        :prepareString(risk.status)
            ,probabilityvalue              :prepareString(risk.probabilityValue)
            ,source                        :prepareString(risk.source)
            ,canedit                       :risk.canEdit
            ,result                        :prepareString(risk.result)
            ,createdon                     :prepareString(risk.createdOn)
            ,deleted                       :risk.deleted
            ,createdbyuserlastname         :prepareString(risk.createdByUserLastName)
            ,companyname                   :prepareString(risk.companyName)
            ,createdbyuserfirstname        :prepareString(risk.createdByUserFirstName)
            ,lastchangedbyuserfirstname    :prepareString(risk.lastChangedByUserFirstName)
            ,projectname                   :prepareString(risk.projectName)
            ,projectisactive               :risk.projectIsActive
            ,impactperformance             :prepareString(risk.impactPerformance)
            ,mitigationplan                :prepareString(risk.mitigationPlan)
            ,probability                   :prepareString(risk.probability)
            ,lastchangedbyuserlastname     :prepareString(risk.lastChangedByUserLastName)
            ,impactcost                    :prepareString(risk.impactCost)
            ,createdbyuserid               :peopleCreatorId
            ,projectsid                    :projectsId
            ,lastchangedbyuserid           :peopleChangedId
            ,companiesid                   :companiesId
        })
    
        log('risks', 'UPDATE', risk.id);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = risksUpdate;