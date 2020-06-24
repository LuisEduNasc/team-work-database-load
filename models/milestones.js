const axios = require('axios');
require('dotenv').config();

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');
let milestones = [];

const getMilestones = async (page) => {
    return new Promise(async (resolve, reject) => {
        const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
        let url = `https://teamwork.corebiz.com.br/milestones.json?page=${page}`
        console.log('request milestones ', url);
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
                milestones.push.apply(milestones, response.data.milestones);
                page = ++page;
                await getMilestones(page);
            }
            
            resolve(milestones);
        }).catch( err => {
            errorHandler(scriptName, err);
            reject(err);
        });
    });
}

const milestonesModel = (page) => {
    milestones = [];
    return getMilestones(page).then(async milestones => {
        const result = await persistenceRoute('milestones', milestones);
        return result;
    });
}

module.exports = milestonesModel;