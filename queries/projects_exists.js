const connection = require('../dao/connection');

const projectsExists = async (project) => {
    const result = await connection('dbo.projects')
    .where('id', project.id)
    .select('projectsId')
    .first();

    return result;
}

module.exports = projectsExists;