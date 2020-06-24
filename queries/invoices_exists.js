const connection = require('../dao/connection');

const invoicesExists = async (invoice) => {
    const result = await connection('dbo.invoices')
        .where('id', invoice.id)
        .select('invoicesId')
        .first();

    return result;
}

module.exports = invoicesExists;