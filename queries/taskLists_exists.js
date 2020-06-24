const connection = require('../dao/connection');

const taskListsExists = async (taskList) => {
    const result = await connection('dbo.taskLists')
    .where('id', taskList.id)
    .select('taskListsId')
    .first();

    return result;
}

module.exports = taskListsExists;