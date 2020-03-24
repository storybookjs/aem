const path = require('path');
const fs = require('fs');

module.exports = config => {

    const filesToReturn = [];
    const recursiveFileSearch = config => {
        if (!fs.existsSync(config.directory)) return;

        const files = fs.readdirSync(config.directory);
        files.forEach( file => {
            const filename = path.resolve(config.directory, file);
            const stat = fs.lstatSync(filename);

            if (stat.isDirectory()) {
                recursiveFileSearch({
                    directory: filename,
                    type: config.type
                });
                
            } else if (stat.isFile()) {
                if (config.type.indexOf(path.extname(file).toLowerCase()) !== -1) filesToReturn.push(filename);
            }
        });

        return filesToReturn;
    }

    return recursiveFileSearch(config);
}