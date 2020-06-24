const connection = require('./dao/connection');
const handleError = require('./errorHandler');

const prepareString = (str) => {
    if(str) 
        return str.toString().replace(/'+/g, "''").replace(/\s+/g,' ').trim();

    return null;
}

const getStartDate = async (lessDays) => {
    const today = new Date();
    const priorDate = new Date(new Date().setDate(today.getDate()-lessDays)).toISOString();
    const formatDate = priorDate.substring(0, priorDate.indexOf('T')).replace(/-+/g, "");
    return formatDate;
}

const logScript = (entity, type, id) => {
    console.log(`${type} in ${entity} id ${id}`)
}

const handleSelect = (entity, id, column) => {
    return new Promise(async (resolve, reject) => { 
        try {
            if(entity && column && id) {
                const result = await connection(entity)
                .where('id', id)
                .select(column)
                .first();

                resolve(result && result[column]);
            } else {
                resolve(null);
            }
        
        } catch (error) {
            reject(handleError('utils', error));
        }
    })
}

module.exports = {
    prepareString: prepareString,
    getStartDate: getStartDate,
    logScript: logScript,
    handleSelect: handleSelect
};