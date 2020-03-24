const { readdirSync } = require('fs');

module.exports = source => {
    return readdirSync(source, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
};