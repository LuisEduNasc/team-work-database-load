const connection = require('../dao/connection');

const financialDelete = async () => {
    await connection('dbo.financial').del();

    return;
}

module.exports = financialDelete;