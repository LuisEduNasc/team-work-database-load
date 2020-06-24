const axios = require('axios');
require('dotenv').config();
const utils = require('../utils');
const getStartDate = utils.getStartDate;

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');
let people = [];

const getPeople = async (page) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const startDate = await getStartDate(60);
            const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
            let url = `https://teamwork.corebiz.com.br/people.json?updatedAfterDate=20150101&pageSize=500&page=${page}`
            console.log('request people ', url);
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
                    await people.push.apply(people, response.data.people);
                    page = ++page;
                    await getPeople(page);
                }
                
                resolve(people);
            }).catch( err => {
                errorHandler(scriptName, err);
                resolve(people);
            });
        }, 5000);
    });
}

const peopleModel = (page) => {
    people = [];
    return getPeople(page).then(async people => {
        const result = await persistenceRoute('people', people);
        return result;
    });
}

module.exports = peopleModel;