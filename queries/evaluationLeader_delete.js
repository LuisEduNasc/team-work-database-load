const connection = require('../dao/connection');

const evaluationLeaderDelete = async () => {
    await connection('dbo.evaluationLeader').del();

    return;
}

module.exports = evaluationLeaderDelete;