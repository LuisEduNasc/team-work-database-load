const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const tagsInsert = async (project, projectsId) => {
    for (let index = 0; index < project.tags.length; index++) {   
        let tagsId = await handleSelect('dbo.tags', project.tags[index].id, 'tagsId');

        await connection('dbo.projectsTags')
            .where({
                projectsid: projectsId
            }).del();
    
        await connection('dbo.projectsTags')
        .insert({
            projectsid: projectsId
            ,tagsid: tagsId
        });
    }

    return;
}

const peopleInsert = async (project, projectsId) => {
    for (let index = 0; index < project.people.length; index++) {
       let peopleId = await handleSelect('dbo.people', project.people[index], 'peopleId');

       if(peopleId) {
            let projectsid = await connection('dbo.projectsPeople')
                .where({
                    projectsid: projectsId
                    ,peopleid: peopleId
                })
                .select('projectsId')
                .first();

            if(!projectsid) {
                await connection('dbo.projectsPeople')
                    .insert({
                        projectsid: projectsId
                        ,peopleid: peopleId
                        ,fromdate: connection.fn.now()
                        ,todate: connection.fn.now()
                    });
            } else {
                let date = await getStartDate(2);
                let projectsid = await connection('dbo.projectsPeople')
                    .where({
                        projectsid: projectsId
                        ,peopleid: peopleId
                    }).andWhere('toDate', '<', date)
                    .select('projectsId')
                    .first();

                if(projectsid) {
                    await connection('dbo.projectsPeople')
                        .insert({
                            projectsid: projectsId
                            ,peopleid: peopleId
                            ,fromdate: connection.fn.now()
                            ,todate: connection.fn.now()
                        });
                } else {
                    await connection('dbo.projectsPeople')
                        .where({
                            projectsid: projectsId
                            ,peopleid: peopleId
                        })
                        .update({
                            todate: connection.fn.now()
                        });
                }
            }
       }
    }

    return;
}

const projectsInsert = async (project) => {
    try {
        const categoriesId = await handleSelect('dbo.categories', project.category ? project.category.id : null, 'categoriesId');
        const companiesId = await handleSelect('dbo.companies', project.company.id, 'companiesId');
        const ownerId = await handleSelect('dbo.people', project.owner ? project.owner.id : null, 'peopleId');
    
        const result = await connection('dbo.projects')
        .insert({
            archivedbyuserid	    :prepareString(project['archived-by-userId'])
            ,archivedbyusername		:prepareString(project['archived-by-userName'])
            ,createdon				:prepareString(project['created-on'])
            ,datearchived			:prepareString(project['date-archived'])
            ,defaultprivacy			:prepareString(project.defaultPrivacy)
            ,description			:prepareString(project.description)	
            ,enddate				:prepareString(project.endDate)	
            ,filesautonewversion	:project.filesAutoNewVersion	
            ,harvesttimersenabled	:project['harvest-timers-enabled']
            ,id                     :prepareString(project.id)
            ,isonboardingproject	:project.isOnBoardingProject	
            ,isprojectadmin			:project.isProjectAdmin	
            ,issampleproject		:project.isSampleProject		
            ,lastchangedon			:prepareString(project['last-changed-on'])
            ,logo					:prepareString(project.logo)
            ,logofromcompany		:project.logoFromCompany
            ,name					:prepareString(project.name)
            ,notifyeveryone			:project.notifyeveryone	
            ,overviewstartpage		:prepareString(project['overview-start-page'])
            ,privacyenabled			:project.privacyEnabled	
            ,replybyemailenabled	:project.replyByEmailEnabled		
            ,showannouncement		:project['show-announcement']	
            ,starred				:project.starred		
            ,startdate				:prepareString(project.startDate)	
            ,startpage				:prepareString(project['start-page'])	
            ,status					:prepareString(project.status)
            ,substatus				:prepareString(project.subStatus)	
            ,tasksstartpage			:prepareString(project['tasks-start-page'])
            ,ownerfullname          :project.owner ? project.owner.fullName : null
            ,categoriesid			:categoriesId	
            ,companiesid			:companiesId
            ,ownerid                :ownerId
        })

        const projectsid = await handleSelect('dbo.projects', project.id, 'projectsId');

        await tagsInsert(project, projectsid);
        await peopleInsert(project, projectsid);
        
        log('projects', 'INSERT', project.id);
    
        return result;
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = projectsInsert;