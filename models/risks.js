const axios = require('axios');
require('dotenv').config();

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');
let risks = [];

const getRisks = async (page) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
            let url = `https://teamwork.corebiz.com.br/risks.json?page=${page}`
            console.log('request risks ', url);
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
                    risks.push.apply(risks, response.data.risks);
                    page = ++page;
                        await getRisks(page);
                    }
                    
                    resolve(risks);
                }).catch( err => {
                    errorHandler(scriptName, err);
                    reject(err);
                });
        }, 3600);
    });
}

const modelRisks = (page) => {
    risks = [];
    return getRisks(page).then(async risks => {
        const result = await persistenceRoute('risks', risks);
        return result;
    });
}

module.exports = modelRisks;