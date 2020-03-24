const chalk = require('chalk');
const log = require('./utils/logger');
const { checkVersion } = require('./utils/versionCheck');

module.exports = () => {
    const args = process.argv.slice(2);
    const cmd = args[0];

    checkVersion();

    switch(cmd) {
        case 'init':
            require('./cmds/init/init')(args);
            break;
        case 'component':
            require('./cmds/component/component')(args);
            break;
        case 'story':
        case 'stories':
            require('./cmds/stories/story')(args);
            break;
        case 'content':
            require('./cmds/content')(args);
            break;
        case 'package':
            require('./cmds/package')(args);
            break;
        case 'v':
        case 'version':
            require('./cmds/version')(args);
            break;
        case 'help':
            require('./cmds/help')(args);
            break;
        default:
            log([
                `${chalk.italic(cmd)} is not a valid command.`,
                ``,
                `Usage: ${chalk.italic('sb-aem <command>')}`,
                ``,
                `Where <command> is on of:`,
                `  init, help, story, version`,
                ``
            ].join('\n'));
            break;
    }
}