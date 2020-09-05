const connection = require('../dao/connection');

const sporadicAlignmentDelete = async () => {
    await connection('dbo.sporadicAlignment').del();

    return;
}

module.exports = sporadicAlignmentDelete;