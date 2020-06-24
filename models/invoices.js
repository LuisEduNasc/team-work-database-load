const axios = require('axios');
require('dotenv').config();

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');
let invoices = [];

const getInvoices = async (page) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
            let url = `https://teamwork.corebiz.com.br/invoices.json?type=all&pageSize=500&page=${page}`
            console.log('request invoices ', url);
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
                if(response.data.invoices.length > 0){            
                    invoices.push.apply(invoices, response.data.invoices);
                    page = ++page;
                    await getInvoices(page);
                }
                    
                resolve(invoices);
            }).catch( async err => {
                errorHandler(scriptName, err);
                // if(err.response.status === 429) {
                //     await getInvoices(page);
                // } else {
                //     resolve(invoices);
                // }
                resolve(invoices);

            });
        }, 5600);
    });
}

const modelInvoices = (page) => {
    invoices = [];
    return getInvoices(page).then(async invoices => {
        const result = await persistenceRoute('invoices', invoices);
        return result;
    });
}

module.exports = modelInvoices;