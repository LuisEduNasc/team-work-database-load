const connection = require('../dao/connection');

const projectRegisterExists = async (project) => {
    const result = await connection('dbo.projectregister')
        .where('projectid', project[1])
        .select('projectregisterid')
        .first();

    return result;
}

module.exports = projectRegisterExists;