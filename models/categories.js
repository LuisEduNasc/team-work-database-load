const axios = require('axios');
require('dotenv').config();

const errorHandler = require('../errorHandler');
var path = require('path');
var scriptName = path.basename(__filename);
const persistenceRoute = require('../dao/persistenceRoute');

const getCategories = async (page) => {
    return new Promise( async (resolve, reject) => {
        let categories = [];
        const auth = 'Basic ' + Buffer.from(`${process.env.TW_USER}:${process.env.TW_PASS}`).toString('base64');
        let url = `https://teamwork.corebiz.com.br/projectCategories.json`
        console.log('request categories ', url);
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
            categories.push.apply(categories, response.data.categories);
            resolve(categories);
        }).catch( err => {
            errorHandler(scriptName, err);
            resolve(categories);
        });
    });
}

const categoriesModel = (page) => {
    return new Promise( async (resolve, reject) => {
        try {
            const categories = await getCategories(page);
            const result = await persistenceRoute('categories', categories);
            resolve(result);
        } catch (error) {
            errorHandler(scriptName, error);
            reject(error);
        }
    });
}

module.exports = categoriesModel;