const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const timeEntriesUpdate = async (entry) => {
    try {
        const companiesId = await handleSelect('dbo.companies', entry['company-id'], 'companiesId');
        const parentTaskId = await handleSelect('dbo.tasks', entry.parentTaskId, 'tasksId');
        const projectsId = await handleSelect('dbo.projects', entry['project-id'], 'projectsId');
        const taskListId = await handleSelect('dbo.taskLists', entry.tasklistId, 'tasklistsId');
        const personId = await handleSelect('dbo.people', entry['person-id'], 'peopleId');
    
        const result = await connection('dbo.timeentries')
        .where('id', '=', entry.id)
        .update({
            canedit                :entry.canEdit
            ,companyname            :prepareString(entry['company-name'])
            ,createdat              :prepareString(entry.createdAt)
            ,date                   :prepareString(entry.date)
            ,dateuserperspective    :prepareString(entry.dateUserPerspective)
            ,description            :prepareString(entry.description)
            ,hasstarttime           :prepareString(entry['has-start-time'])
            ,hours                  :prepareString(entry.hoursDecimal)
            ,hoursdecimal           :entry.hoursDecimal
            ,invoiceno              :prepareString(entry.invoiceNo)
            ,invoicestatus          :prepareString(entry.invoiceStatus)
            ,isbillable             :prepareString(entry.isbillable)
            ,isbilled               :prepareString(entry.isbilled)
            ,minutes                :prepareString(entry.minutes)
            ,parenttaskname         :prepareString(entry.parentTaskName)
            ,projectname            :prepareString(entry['project-name'])
            ,projectstatus          :prepareString(entry['project-status'])
            ,taskestimatedtime      :prepareString(entry.taskEstimatedTime)
            ,todoitemid             :prepareString(entry['todo-item-id'])
            ,taskisprivate          :prepareString(entry.taskIsPrivate)
            ,taskissubtask          :prepareString(entry.taskIsSubTask)
            ,todoitemname           :prepareString(entry['todo-item-name'])
            ,todolistid             :prepareString(entry['todo-list-id'])
            ,todolistname           :prepareString(entry['todo-list-name'])
            ,ticketid               :prepareString(entry['ticket-id'])
            ,updateddate            :prepareString(entry['updated-date'])
            ,userdeleted            :entry.userDeleted
            ,personfirstname        :prepareString(entry['person-first-name'])
            ,personlastname         :prepareString(entry['person-last-name'])
            ,companyid              :companiesId
            ,parenttaskid           :parentTaskId
            ,projectsid             :projectsId
            ,tasklistid             :taskListId
            ,personid               :personId
        });
    
        log('timeEntries', 'UPDATE', entry.id);
    
        return result;
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = timeEntriesUpdate;