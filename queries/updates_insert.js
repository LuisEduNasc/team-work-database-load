const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const updatesInsert = async (update) => {
    try {
        const peopleCreatorId = await handleSelect('dbo.people', update.user.id ? update.user.id : null, 'peopleId');
        const projectsId = await handleSelect('dbo.projects', update.projectId ? update.projectId : null, 'projectsId');

        const result = await connection('dbo.updates')
            .insert({
                deletedate              :prepareString(update.deletedDate)
                ,text                   :prepareString(update.text)
                ,health                 :prepareString(update.health)
                ,id                     :prepareString(update.id)
                ,projectname            :prepareString(update.projectName)
                ,datecreated            :prepareString(update.dateCreated)
                ,color                  :prepareString(update.color)
                ,deleted                :update.deleted
                ,useravatarurl          :prepareString(update.user.avatarUrl)
                ,userfirstname          :prepareString(update.user.firstName)
                ,userfullname           :prepareString(update.user.fullName)
                ,userlastname           :prepareString(update.user.lastName)
                ,projectstatus          :prepareString(update.projectStatus)
                ,projectsid             :projectsId
                ,peopleid               :peopleCreatorId
            });
    
        log('update', 'INSERT', update.id);
    
        return result;
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = updatesInsert;