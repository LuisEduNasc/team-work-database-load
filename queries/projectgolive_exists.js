const connection = require('../dao/connection');

const projectGoLiveExists = async (project) => {
    const result = await connection('dbo.projectgolive')
        .where('projectid', project[1])
        .select('projectgoliveid')
        .first();

    return result;
}

module.exports = projectGoLiveExists;