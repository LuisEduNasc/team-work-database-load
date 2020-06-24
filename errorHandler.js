const fs = require('fs');
const dirName = 'errorQueryLog';

const handleError = async (file, error) => {
    console.log(`Error raised on ${file}: ${error}`);
}

module.exports = handleError;