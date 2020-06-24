const connection = require('../dao/connection');

const peopleExists = async (people) => {
    const result = await connection('dbo.people')
    .where('id', people.id)
    .select('peopleId')
    .first();

    return result;
}

module.exports = peopleExists;