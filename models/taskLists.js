const axios = require('axios');
require('dotenv').config();

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');
let taskLists = [];

const getTaskLists = async (page) => {
    return new Promise(async (resolve, reject) => {
        const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
        let url = `https://teamwork.corebiz.com.br/tasklists.json?status=active&pageSize=500&page=${page}`
        console.log('request tasklists ', url);
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
                taskLists.push.apply(taskLists, response.data.tasklists);
                page = ++page;
                await getTaskLists(page);
            }
            
            resolve(taskLists);
        }).catch( err => {
            errorHandler(scriptName, err);
            reject(err);
        });
    });
}

const modelTaskLists = (page) => {
    taskLists = [];
    return getTaskLists(page).then(async taskLists => {
        const result = await persistenceRoute('taskLists', taskLists);
        return result;
    });
}

module.exports = modelTaskLists;