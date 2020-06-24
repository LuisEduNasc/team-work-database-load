const connection = require('../dao/connection');

const timeEntriesExists = async (entry) => {
    const result = await connection('dbo.timeentries')
    .where('id', entry.id)
    .select('timeEntriesId')
    .first();

    return result;
}

module.exports = timeEntriesExists;