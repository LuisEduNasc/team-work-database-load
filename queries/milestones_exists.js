const connection = require('../dao/connection');

const milestonesExists = async (milestones) => {
    const result = await connection('dbo.milestones')
        .where('id', milestones.id)
        .select('milestonesId')
        .first();

    return result;
}

module.exports = milestonesExists;