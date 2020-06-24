const { google } = require('googleapis');
const googleSheetskeys = require('./googleSheetsKeys.json');
const connection = require('../dao/connection');
const persistenceRoute = require('../dao/persistenceRoute');

const spreadsheetIds = [
    projectGolive = [ 
        opt =  {
            spreadsheetId: '1A6y2eJjLFJmkwe9hKk-u7FsY22t4m867a-3N_AR5t4A',
            majorDimension: 'ROWS',
            range: "'Project golive BD'!A1:H20000"
        }, 
        entity = 'projectgolive'
    ],
    projectRegister = [
        opt = {
            spreadsheetId: '1A6y2eJjLFJmkwe9hKk-u7FsY22t4m867a-3N_AR5t4A',
            majorDimension: 'ROWS',
            range: "'Project Register BD'!A1:M20000"
        },
        entity = 'projectregister'
    ]
]

const gsrun = async (cl) => {
    return new Promise(async (resolve, reject) => {
        try {
            const gsapi = google.sheets({version: 'v4', auth: cl});
        
            const opt = {
                spreadsheetId: '1A6y2eJjLFJmkwe9hKk-u7FsY22t4m867a-3N_AR5t4A',
                majorDimension: 'COLUMNS',
                range: "'Project Register BD'!A1:H20000"
            };
    
            for (let index = 0; index < spreadsheetIds.length; index++) {
                let result = await gsapi.spreadsheets.values.get(spreadsheetIds[index][0]);
                result.data.values.shift();

                await persistenceRoute(spreadsheetIds[index][1], result.data.values);
            }

            let cont = spreadsheetIds.length;
            resolve(cont);
        } catch (error) {
            console.log('Error on google sheets...', error);
            reject(error);
        }
    })
};

const getGoogleSheetsData = async (page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result;
            const client = new google.auth.JWT(
                googleSheetskeys.client_email, 
                null, 
                googleSheetskeys.private_key,
                ['https://www.googleapis.com/auth/spreadsheets']
            );
        
            client.authorize(async (err, tokens) => {
                if(err) {
                    console.log('Error ', err);
                    return;
                }
        
                console.log('Connected to Google Sheets!');
                result = await gsrun(client);
            }).then(data => {
                resolve({qtd: result, entity: 'googleSheets'});
            });

        } catch (error) {
            reject(error);
        }
    });
};

module.exports = getGoogleSheetsData;