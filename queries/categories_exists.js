const connection = require('../dao/connection');

const categoriesExists = async (category) => {
    const result = await connection('dbo.categories')
        .where('id', category.id)
        .select('categoriesId')
        .first();

    return result;
}

module.exports = categoriesExists;