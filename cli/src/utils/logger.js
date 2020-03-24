const chalk = require('chalk');

module.exports = (...args) => {
    const sbaem = chalk.rgb(255, 71, 133).bold('[sb-aem]');
    console.log(`${sbaem}`, ...args);
};