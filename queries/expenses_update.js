const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const expensesUpdate = async (expense) => {
    try {
        const projectsId = await handleSelect('dbo.projects', expense['project-id'] ? expense['project-id'] : null, 'projectsId');
        const companiesId = await handleSelect('dbo.companies', expense['company-id'] ? expense['company-id'] : null, 'companiesId');
        const peoplesCreatorId = await handleSelect('dbo.people', expense['created-by-user-id'] ? expense['created-by-user-id'] : null, 'peopleId');
        
        const result = await connection('dbo.expenses')
        .where('id', '=', expense.id)
        .update({
             name                    :prepareString(expense.name)
            ,description            :prepareString(expense.description)
            ,createdbyuserfirstname :prepareString(expense['created-by-user-firstname'])
            ,updateddate            :prepareString(expense['updated-date'])
            ,projectname            :prepareString(expense['project-name'])
            ,createdbyuserlastname  :prepareString(expense['created-by-user-lastname'])
            ,date                   :prepareString(expense.date)
            ,companyname            :prepareString(expense['company-name'])
            ,cost                   :prepareString(expense.cost)
            ,projectsid             :projectsId
            ,companiesid            :companiesId
            ,createdbyuserid        :peoplesCreatorId
        })
    
        log('expenses', 'UPDATE', expense.id);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = expensesUpdate;