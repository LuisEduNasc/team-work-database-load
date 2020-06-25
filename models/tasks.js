const axios = require('axios');
require('dotenv').config();

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');
const utils = require('../utils');
const getStartDate = utils.getStartDate;
let tasks = [];

const getTasks = async (page) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const startDate = await getStartDate(5);
            const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
            let url = `https://teamwork.corebiz.com.br/tasks.json?filter=all&includeCompletedTasks=true&includeCompletedSubtasks=true&updatedAfterDate=${startDate}&pageSize=250&page=${page}`
            console.log('request tasks ', url);
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
                    tasks.push.apply(tasks, response.data['todo-items']);
                    page = ++page;
                    await getTasks(page);
                }
                
                resolve(tasks);
            }).catch( err => {
                errorHandler(scriptName, err);
                reject(err);
            });
        }, 3600);
    });
}

const modelTasks = (page) => {
    tasks = [];
    return getTasks(page).then(async tasks => {
        const result = await persistenceRoute('tasks', tasks);
        return result;
    });
}

module.exports = modelTasks;