const axios = require('axios');
require('dotenv').config();

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');

const getTags = async (page) => {
    return new Promise( async (resolve, reject) => {
        let tags = [];
        const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
        let url = `https://teamwork.corebiz.com.br/tags.json`
        console.log('request tags ', url);
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
            tags.push.apply(tags, response.data.tags);
            resolve(tags);
        }).catch( err => {
            errorHandler(scriptName, err);
            reject(err);
        });
    })
}

const tagsModel = (page) => {
    return getTags(page).then(async tags => {
        const result = await persistenceRoute('tags', tags);
        return result;
    });
}

module.exports = tagsModel;