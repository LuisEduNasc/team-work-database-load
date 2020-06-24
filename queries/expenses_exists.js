const connection = require('../dao/connection');

const expensesExists = async (expense) => {
    const result = await connection('dbo.expenses')
        .where('id', expense.id)
        .select('expensesId')
        .first();

    return result;
}

module.exports = expensesExists;