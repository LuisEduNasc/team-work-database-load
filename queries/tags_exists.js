const connection = require('../dao/connection');

const tagsExists = async (tag) => {
    const result = await connection('dbo.tags')
    .where('id', tag.id)
    .select('tagsId')
    .first();

    return result;
}

module.exports = tagsExists;