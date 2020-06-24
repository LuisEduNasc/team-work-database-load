const connection = require('../dao/connection');

const financialExists = async (financial) => {
    const result = await connection('dbo.financial')
        .where('duedate', financial[0])
        .andWhere('competencedate', financial[1])
        .select('financialid')
        .first();

    return result;
}

module.exports = financialExists;