const axios = require('axios');
require('dotenv').config();

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');
let companies = [];

const getCompanies = async (page) => {
    return new Promise(async (resolve, reject) => {
        const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
        let url = `https://teamwork.corebiz.com.br/companies.json?pageSize=500&page=${page}`
        console.log('request companies ', url);
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
                companies.push.apply(companies, response.data.companies);
                page = ++page;
                await getCompanies(page);
            }
            
            resolve(companies);
        }).catch( err => {
            errorHandler(scriptName, err);
            reject(err);
        });
    });
}

const companiesModel = (page) => {
    companies = [];
    return getCompanies(page).then(async companies => {
        const result = await persistenceRoute('companies', companies);
        return result;
    });
}

module.exports = companiesModel;