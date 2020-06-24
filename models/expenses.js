const axios = require('axios');
require('dotenv').config();

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');
let expenses = [];

const getExpenses = async (page) => {
    return new Promise(async (resolve, reject) => {
        const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
        let url = `https://teamwork.corebiz.com.br/expenses.json?page=${page}`
        console.log('request expenses ', url);
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
                expenses.push.apply(expenses, response.data.expenses);
                page = ++page;
                await getExpenses(page);
            }
            
            resolve(expenses);
        }).catch( err => {
            errorHandler(scriptName, err)
            reject(err);
        });
    });
}

const modelExpenses = (page) => {
    expenses = [];
    return getExpenses(page).then(async expenses => {
        const result = await persistenceRoute('expenses', expenses);
        return result;
    });
}

module.exports = modelExpenses;