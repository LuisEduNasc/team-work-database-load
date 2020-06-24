const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const tagsInsert = async (task, taskId) => {
    for (let index = 0; index < task.tags.length; index++) {   
        let tagsId = await handleSelect('dbo.tags', task.tags[index].id, 'tagsId');
    
        await connection('dbo.tasksTags')
        .where({
            tasksid: taskId
        }).del();
        
        if(tagsId) {
            await connection('dbo.tasksTags')
                .insert({
                    tasksid: taskId
                    ,tagsid: tagsId
                });
        }
    }

    return;
}

const responsiblePartyInsert = async (responsiblePartyIds, taskId) => {
    for (let index = 0; index < responsiblePartyIds.length; index++) {   
        let peopleId = await handleSelect('dbo.people', responsiblePartyIds[index], 'peopleId');

        if(peopleId) {
            await connection('dbo.tasksResponsibleParty')
                .where({
                    tasksid: taskId
                }).del();
        
            await connection('dbo.tasksResponsibleParty')
                .insert({
                    tasksid: taskId
                    ,peopleid: peopleId
                });
        }
    }

    return;
}

const commentsFollowersInsert = async (commentsFollowers, taskId) => {
    for (let index = 0; index < commentsFollowers.length; index++) {   
        let peopleId = await handleSelect('dbo.people', commentsFollowers[index], 'peopleId');
    
        if(peopleId) {
            await connection('dbo.tasksCommentFollowers')
                .where({
                    tasksid: taskId
                }).del();
    
            await connection('dbo.tasksCommentFollowers')
                .insert({
                    tasksid: taskId
                    ,peopleid: peopleId
                });
        }
    }

    return;
}

const tasksInsert = async (task) => {
    try {
        const responsiblePartyIds = task['responsible-party-ids'] != undefined && task['responsible-party-ids'] != null ? task['responsible-party-ids'].split(',') : null;
        const commentsFollowers = task.commentFollowerIds != undefined && task.commentFollowerIds != null ? task.commentFollowerIds.split(',') : null;

        const projectsId = await handleSelect('dbo.projects', task['project-id'] ? task['project-id'] : null, 'projectsId');
        const taskListsId = await handleSelect('dbo.taskLists', task['todo-list-id'] ? task['todo-list-id'] : null, 'tasklistsId');
        const companiesId = await handleSelect('dbo.companies', task['company-id'] ? task['company-id'] : null, 'companiesId');
        const peopleCreatorId = await handleSelect('dbo.people', task['creator-id'] ? task['creator-id'] : null, 'peopleId');
        const peopleUpdaterId = await handleSelect('dbo.people', task['updater-id'] ? task['updater-id'] : null, 'peopleId');
        const peopleCompleterId = await handleSelect('dbo.people', task['completer_id'] ? task['completer_id'] : null, 'peopleId');
        const parentTaskId = await handleSelect('dbo.people', task.parentTaskId ? task.parentTaskId : null, 'peopleId');

        const result = await connection('dbo.tasks')
        .insert({
             id                            :task.id
            ,boardcolumnid                :task.boardColumn ? task.boardColumn.id : null
            ,boardcolumnname              :prepareString(task.boardColumn ? task.boardColumn.name : null)
            ,boardcolumncolor             :prepareString(task.boardColumn ? task.boardColumn.color : null)
            ,cardid                       :task.cardId ? task.cardId : null
            ,cancomplete                  :task.canComplete
            ,commentscount                :task['comments-count']
            ,completerfirstname           :prepareString(task['completer_firstname'])
            ,completerlastname            :prepareString(task['completer_lastname'])
            ,description                  :prepareString(task.description)
            ,hasreminders                 :task['has-reminders']
            ,hasunreadcomments            :task['has-unread-comments']
            ,private                      :task.private
            ,content                      :prepareString(task.content)
            ,tasksorder                   :task.order
            ,projectname                  :prepareString(task['project-name'])
            ,tasklistname                 :prepareString(task['todo-list-name'])
            ,tasklistprivate              :task['tasklist-private']
            ,tasklististemplate           :task['tasklist-isTemplate']
            ,status                       :prepareString(task.status)
            ,companyname                  :prepareString(task['company-name'])
            ,creatorfirstname             :prepareString(task['creator-firstname'])
            ,creatorlastname              :prepareString(task['creator-lastname'])
            ,updaterfirstname             :prepareString(task['updater-firstname'])
            ,updaterlastname              :prepareString(task['updater-lastname'])
            ,completed                    :task.completed
            ,startdate                    :prepareString(task['start-date'])
            ,duedatebase                  :prepareString(task['due-date-base'])
            ,duedate                      :prepareString(task['due-date'])
            ,createdon                    :prepareString(task['created-on'])
            ,lastchangeon                 :prepareString(task['last-changed-on'])
            ,position                     :task.position
            ,completedon                  :prepareString(task['completed_on'])
            ,estimatedminutes             :task['estimated-minutes']
            ,priority                     :prepareString(task.priority)
            ,progress                     :task.progress
            ,harvestenabled               :task['harvest-enabled']
            ,lockdownid                   :prepareString(task.lockdownId)
            ,tasklistlockdownid           :prepareString(task['tasklist-lockdownId'])
            ,hasdependencies              :task['has-dependencies']
            ,haspredecessors              :task['has-predecessors']
            ,hastickets                   :task.hasTickets
            ,timeislogged                 :prepareString(task.timeIsLogged)
            ,attachmentscount             :task['attachments-count']
            ,responsiblepartynames        :prepareString(task['responsible-party-names'])
            ,responsiblepartytype         :prepareString(task['responsible-party-type'])
            ,responsiblepartyfirstname    :prepareString(task['responsible-party-firstname'])
            ,responsiblepartylastname     :prepareString(task['responsible-party-lastname'])
            ,responsiblepartysummary      :prepareString(task['responsible-party-summary'])
            ,recorringfrequency           :prepareString(task.recurring ? task.recurring.frequency : null)
            ,sequenceid                   :prepareString(task.recurring ? task.recurring.sequenceId : null)
            ,canedit                      :task.canEdit
            ,viewestimatedtime            :task.viewEstimatedTime
            ,creatoravatarurl             :prepareString(task['creator-avatar-url'])
            ,canlogtime                   :task.canLogTime
            ,commentfollowerssummary      :prepareString(task.commentFollowerSummary)
            ,changefollowerssummary       :prepareString(task.changeFollowerSummary)
            ,projectsid                   :projectsId
            ,tasklistsid                  :taskListsId
            ,companiesid                  :companiesId
            ,peoplecreatorid              :peopleCreatorId
            ,peopleupdaterid              :peopleUpdaterId
            ,peoplecompleterid            :peopleCompleterId
            ,parenttaskid                 :parentTaskId
        });

        const tasksid = await handleSelect('dbo.tasks', task.id, 'tasksId');

        task.tags && await tagsInsert(task, tasksid);
        responsiblePartyIds && await responsiblePartyInsert(responsiblePartyIds, tasksid);
        commentsFollowers && await commentsFollowersInsert(commentsFollowers, tasksid);
    
        log('tasks', 'INSERT', task.id);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = tasksInsert;