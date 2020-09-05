const connection = require('../dao/connection');

const evaluationChapterDelete = async () => {
    await connection('dbo.evaluationChapter').del();

    return;
}

module.exports = evaluationChapterDelete;