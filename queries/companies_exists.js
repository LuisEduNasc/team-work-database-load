const connection = require('../dao/connection');

const companiesExists = async (company) => {
    const result = await connection('dbo.companies')
    .where('id', company.id)
    .select('companiesId')
    .first();

    return result;
}

module.exports = companiesExists;