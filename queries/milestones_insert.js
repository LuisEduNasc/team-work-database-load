const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const tasklistsInsert = async (milestones, milestonesid) => {

    await connection('dbo.milestonesTasklists')
    .where({
        milestonesid: milestonesid
    }).del();
    
    for (let index = 0; index < milestones.tasklists.length; index++) {   
        let taskListsId = await handleSelect('dbo.taskLists', milestones.tasklists[index].id, 'taskListsId');

        if(taskListsId) {
        
            await connection('dbo.milestonesTasklists')
            .insert({
                milestonesid: milestonesid
                ,tasklistsid: taskListsId
            });
        }
    }

    return;
}

const tagsInsert = async (milestones, milestonesid) => {

    await connection('dbo.milestonesTags')
    .where({
        milestonesid: milestonesid
    }).del();

    for (let index = 0; index < milestones.tags.length; index++) {   
        let tagsId = await handleSelect('dbo.tags', milestones.tags[index].id, 'tagsId');
    
        await connection('dbo.milestonesTags')
        .insert({
            milestonesid: milestonesid
            ,tagsid: tagsId
        });
    }

    return;
}

const milestonesInsert = async (milestones) => {
    try {
        const companiesId = await handleSelect('dbo.companies', prepareString(milestones['company-id']), 'companiesId');
        const peoplesCreatorId = await handleSelect('dbo.people', prepareString(milestones['creator-id']), 'peopleId');
        const peoplesCompleterId = await handleSelect('dbo.people', prepareString(milestones['completer-id']), 'peopleId');
        const projectsId = await handleSelect('dbo.projects', prepareString(milestones['project-id']), 'projectsId');

        const result = await connection('dbo.milestones')
        .insert({
            cancomplete                   :milestones.canComplete
            ,responsiblepartyid           :prepareString(milestones['responsible-party-id'])
            ,responsiblepartyfullnames    :prepareString(milestones.responsiblePartyFullNames)
            ,responsiblepartynames        :prepareString(milestones.responsiblePartyNames)
            ,private                      :milestones.private
            ,userfollowingcomments        :milestones.userFollowingComments
            ,commentscount                :prepareString(milestones['comments-count'])
            ,completedon                  :prepareString(milestones['completed-on'])
            ,status                       :prepareString(milestones.status)
            ,changefollowersids           :prepareString(milestones.changeFollowerIds)
            ,createdon                    :prepareString(milestones['created-on'])
            ,canedit                      :milestones.canEdit
            ,responsiblepartytype         :prepareString(milestones['responsible-party-type'])
            ,isprivate                    :milestones.isprivate
            ,companyname                  :prepareString(milestones['company-name'])
            ,id                           :prepareString(milestones.id)
            ,lastchangeon                 :prepareString(milestones['last-changed-on'])
            ,commentfollowerids           :prepareString(milestones.commentFollowerIds)
            ,completed                    :milestones.completed
            ,responsiblepartyids          :prepareString(milestones.responsiblePartyIds)
            ,reminder                     :prepareString(milestones.reminder)
            ,userfollowingchanges         :milestones.userFollowingChanges
            ,description                  :prepareString(milestones.description)
            ,responsiblepartyfirstname    :prepareString(milestones['responsible-party-firstname'])
            ,completerfirstname           :prepareString(milestones['completer-firstname'])
            ,responsiblepartylastname     :prepareString(milestones['responsible-party-lastname'])
            ,duedateoffset                :prepareString(milestones.dueDateOffset)
            ,completerlastname            :prepareString(milestones['completer-lastname'])
            ,deadline                     :prepareString(milestones.deadline)
            ,title                        :prepareString(milestones.title)
            ,companiesid                  :companiesId
            ,creatorid                    :peoplesCreatorId
            ,completerid                  :peoplesCompleterId
            ,projectsid                   :projectsId
        });

        const milestonesid = await handleSelect('dbo.milestones', milestones.id, 'milestonesId');

        await tasklistsInsert(milestones, milestonesid);
        await tagsInsert(milestones, milestonesid);
    
        log('milestones', 'INSERT', milestones.id);
    
        return result;
        
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = milestonesInsert;