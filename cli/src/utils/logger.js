const chalk = require('chalk');

module.exports = (...args) => {
    const sbaem = chalk.rgb(255, 71, 133).bold('[storybook-aem]');
    console.log(`${sbaem}`, ...args);
};