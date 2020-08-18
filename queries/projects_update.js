const utils = require('../utils');
const prepareString = utils.prepareString;
const log = utils.logScript;
const handleSelect = utils.handleSelect;
const getStartDate = utils.getStartDate;
const connection = require('../dao/connection');
const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);

const tagsInsert = async (project, projectsId) => {
    
    await connection('dbo.projectsTags')
    .where({
        projectsid: projectsId
    }).del();

    for (let index = 0; index < project.tags.length; index++) {   
        let tagsId = await handleSelect('dbo.tags', project.tags[index].id, 'tagsId');
    
        await connection('dbo.projectsTags')
        .insert({
            projectsid: projectsId
            ,tagsid: tagsId
        });
    }

    return;
}

const peopleInsert = async (project, projectsId) => {
    let d = new Date();
    d.setDate(d.getDate()-2);
    let date = d.toISOString().substr(0, 10);

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
                let maxId = await connection('dbo.projectsPeople')
                .where({
                    projectsid: projectsId
                    ,peopleid: peopleId
                }).max('projectsId')
                .select('projectsId')
                .first();

                let projectsid = await connection('dbo.projectsPeople')
                    .where({
                        projectsid: projectsId
                        ,peopleid: peopleId
                    }).andWhere('projectsId', '=', maxId)
                    .andWhere('toDate', '<', date)
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

const projectsUpdate = async (project) => {
    try {
        const categoriesId = await handleSelect('dbo.categories', project.category ? project.category.id : null, 'categoriesId');
        const companiesId = await handleSelect('dbo.companies', project.company.id, 'companiesId');
        const ownerId = await handleSelect('dbo.people', project.owner ? project.owner.id : null, 'peopleId');
        const projectsid = await handleSelect('dbo.projects', project.id, 'projectsId');
    
        await connection('dbo.projects')
            .where('id', '=', project.id)
            .update({
                archivedbyuserid	    :prepareString(project['archived-by-userId'])
                ,archivedbyusername		:prepareString(project['archived-by-userName'])	
                ,createdon				:prepareString(project['created-on'])
                ,datearchived			:prepareString(project['date-archived'])
                ,defaultprivacy			:prepareString(project.defaultPrivacy)
                ,description			:prepareString(project.description)	
                ,enddate				:prepareString(project.endDate)
                ,filesautonewversion	:project.filesAutoNewVersion	
                ,harvesttimersenabled	:project['harvest-timers-enabled']
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
            });

        await tagsInsert(project, projectsid);
        await peopleInsert(project, projectsid);
    
        log('projects', 'UPDATE', project.id);
    
        return projectsid;
    } catch (error) {
        errorHandler(scriptName, error);
    }
}

module.exports = projectsUpdate;