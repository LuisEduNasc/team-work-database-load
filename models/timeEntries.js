const axios = require('axios');
require('dotenv').config();
const utils = require('../utils');
const getStartDate = utils.getStartDate;

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');
let entries = [];

const getTimeEntries = async (page) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const startDate = await getStartDate(31);
            const toDate = await getStartDate(0);
            const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
            let url = `https://teamwork.corebiz.com.br/time_entries.json?fromdate=${startDate}&todate=${toDate}&pageSize=500&page=${page}`
            console.log('request time entry ', url);
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
                    await entries.push.apply(entries, response.data['time-entries']);
                    page = ++page;
                    await getTimeEntries(page);
                }
                
                resolve(entries);
            }).catch( err => {
                errorHandler(scriptName, err);
                resolve(entries);
            });
        }, 3600);
    });
}

const timeEntriesModel = (page) => {
    entries = [];
    return getTimeEntries(page).then(async timeentries => {
        const result = await persistenceRoute('timeentries', timeentries);
        return result;
    });
}

module.exports = timeEntriesModel;