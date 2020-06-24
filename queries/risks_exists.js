const connection = require('../dao/connection');

const risksExists = async (risk) => {
    const result = await connection('dbo.risks')
        .where('id', risk.id)
        .select('risksId')
        .first();

    return result;
}

module.exports = risksExists;