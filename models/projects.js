const axios = require('axios');
require('dotenv').config();
const utils = require('../utils');
const getStartDate = utils.getStartDate;

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');
let projects = [];
let projectUpdates = [];

const getProjects = async (page) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const startDate = await getStartDate(7);
            const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
            let url = `https://teamwork.corebiz.com.br/projects.json?status=all&updatedAfterDate=${startDate}&includePeople=true&includeProjectOwner=true&page=${page}`
            console.log('request projects ', url);
            await axios({
                method: 'get',
                url: url,
                responseType: 'json',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': auth
                }
            }).then(async response => {
                if(page <= response.headers['x-pages']){            
                    projects.push.apply(projects, response.data.projects);
                    page = ++page;
                        await getProjects(page);
                    }
                    
                    resolve(projects);
                }).catch( err => {
                    errorHandler(scriptName, err);
                    reject(err);
                });
        }, 3600);
    });
}

const projectUpdateRequest = async (projects, idx, id, page) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
            let url = `https://teamwork.corebiz.com.br/projects/${id}/updates.json?pageSize=250&page=${page}`
            console.log('request projects updates ', url);
            await axios({
                method: 'get',
                url: url,
                responseType: 'json',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': auth
                }
            }).then(async response => {
                if(response.data.updates.length > 0){            
                    projectUpdates.push.apply(projectUpdates, response.data.updates);
                    page = ++page;
                    await projectUpdateRequest(projects, idx, id, page);
                }
                
                resolve(projectUpdates);
            }).catch( async err => {
                errorHandler(scriptName, err);
                // if(err.response.status === 429) {
                //     await getProjectUpdates(projects, idx);
                // } else {
                //     resolve(projectUpdates);
                // }
                resolve(projectUpdates);

            });
        }, 1000);
    });
}

const getProjectUpdates = async (projects, repeatIndex = 0) => {
    return new Promise(async (resolve, reject) => {
        let result;
        let index = repeatIndex !== 0 ? repeatIndex : 0;

        try {            
            for (index; index < projects.length; index++) {
                result = await projectUpdateRequest(projects, index, projects[index].id, 1)
            }
        } catch (error) {
            errorHandler(scriptName, error);
            reject(error);
        }

        resolve(result)
    });
}

const projectsModel = (page) => {
    projects = [];
    projectUpdates = [];
    return getProjects(page).then(async projects => {
        const result = await persistenceRoute('projects', projects);
        await getProjectUpdates(projects).then(async updates => {
            await persistenceRoute('updates', updates);
        });
        return result;
    });
}

module.exports = projectsModel;