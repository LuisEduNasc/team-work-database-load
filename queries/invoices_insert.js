const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const invoicesInsert = async (invoice) => {
    try {
        const projectsId = await handleSelect('dbo.projects', invoice['project-id'] ? invoice['project-id'] : null, 'projectsId');
        const companiesId = await handleSelect('dbo.companies', invoice['company-id'] ? invoice['company-id'] : null, 'companiesId');
        const peoplesCreatorId = await handleSelect('dbo.people', invoice['created-by-user-id'] ? invoice['created-by-user-id'] : null, 'peopleId');
        const peopleUpdaterId = await handleSelect('dbo.people', invoice['update-by-user-id'] ? invoice['update-by-user-id'] : null, 'peopleId');

        const result = await connection('dbo.invoices')
        .insert({
             exportedbyuserid                 :prepareString(invoice['exported-by-user-id'])
            ,timecost                        :prepareString(invoice['time-cost'])
            ,createdbyuserfirstname          :prepareString(invoice['created-by-user-firstname'])
            ,fixedcost                       :prepareString(invoice['fixed-cost'])
            ,status                          :prepareString(invoice.status)
            ,datecreated                     :prepareString(invoice['date-created'])
            ,exportedbyuserlastname          :prepareString(invoice['exported-by-user-lastname'])
            ,number                          :prepareString(invoice.number)
            ,ponumber                        :prepareString(invoice['po-number'])
            ,exportedbyuserfirstname         :prepareString(invoice['exported-by-user-firstname'])
            ,id                              :prepareString(invoice.id)
            ,companyname                     :prepareString(invoice['company-name'])
            ,editedbyuserfirstname           :prepareString(invoice['edited-by-user-firstname'])
            ,totaltimedecimal                :prepareString(invoice['total-time-decimal'])
            ,totalcost                       :prepareString(invoice['total-cost'])
            ,description                     :prepareString(invoice.description)
            ,expensescost                    :prepareString(invoice['expenses-cost'])
            ,totaltime                       :prepareString(invoice['total-time'])
            ,exporteddate                    :prepareString(invoice['exported-date'])
            ,displaydate                     :prepareString(invoice['display-date'])
            ,projectname                     :prepareString(invoice['project-name'])
            ,createdbyuserlastname           :prepareString(invoice['created-by-user-lastname'])
            ,dateupdated                     :prepareString(invoice['date-updated'])
            ,editedbyuserlastname            :prepareString(invoice['edited-by-user-lastname'])
            ,currencycode                    :prepareString(invoice['currency-code'])
            ,projectsid                      :projectsId
            ,updatebyuserid                  :peopleUpdaterId
            ,createdbyuserid                 :peoplesCreatorId
            ,companiesid                     :companiesId
        })
    
        log('invoices', 'INSERT', invoice.id);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = invoicesInsert;