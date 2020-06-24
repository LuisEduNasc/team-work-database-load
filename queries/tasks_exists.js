const connection = require('../dao/connection');

const tasksExists = async (task) => {
    const result = await connection('dbo.tasks')
        .where('id', task.id)
        .select('tasksId')
        .first();

    return result;
}

module.exports = tasksExists;