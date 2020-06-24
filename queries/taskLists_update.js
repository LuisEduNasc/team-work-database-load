const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const tagsInsert = async (taskList, taskListsId) => {
     for (let index = 0; index < taskList.tags.length; index++) {   
        let tagsId = await handleSelect('dbo.tags', taskList.tags[index].id, 'tagsId');
    
        await connection('dbo.taskListsTags')
            .insert({
                tasklistsid: taskListsId
                ,tagsid: tagsId
            });
    }

    return;
}

const taskListsUpdate = async (taskList) => {
    try {
        const milestonesId = await handleSelect('dbo.milestones', taskList['milestone-id'], 'milestonesId');
        const projectsId = await handleSelect('dbo.projects', taskList.projectId, 'projectsId');
    
        const result = await connection('dbo.taskLists')
            .where('id', '=', taskList.id)
            .update({
                 name                  :prepareString(taskList.name)
                ,description           :prepareString(taskList.description)
                ,position              :taskList.position
                ,projectname           :prepareString(taskList.projectName)
                ,lastupdate            :prepareString(taskList.lastUpdated)
                ,private               :taskList.private
                ,istemplate            :taskList.isTemplate
                ,pinned                :taskList.pinned
                ,complete              :taskList.complete
                ,uncompletedcount      :taskList['uncompleted-count']
                ,status                :prepareString(taskList.status)
                ,projectsid            :projectsId
                ,milestonesid          :milestonesId
            });

        const tasklistsid = await handleSelect('dbo.taskLists', taskList.id, 'taskListsId');
    
        await connection('dbo.taskListsTags')
            .where('taskListsId', tasklistsid)
            .del();
        
        await tagsInsert(taskList, tasklistsid);
    
        log('tasklists', 'UPDATE', taskList.id);
    
        return result;
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = taskListsUpdate;