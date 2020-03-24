const npm = require('npm');
const chalk = require('chalk');

const { version } = require('../../package.json');

const getLatestVersion = async (callback) => {
    return await npm.load({ loaded: false }, async (err) => {
        if (err) throw err;

        return await npm.commands.view(['storybook-aem'],true,(param,json) => {
            if (callback) callback(Object.keys(json)[0])
            return Object.keys(json)[0];
        })
    });
}

const getInstalledVersion = () => version;

async function checkVersion() {
    const installed = getInstalledVersion();
    getLatestVersion(latest => {
        if (latest > installed) {
            const sb = chalk.rgb(255, 71, 133).bold;
            console.log([
                ``,
                `  ${sb(`---------------------------------------------`)}`,
                `  ${sb(`|`)}                                           ${sb(`|`)}`,
                `  ${sb(`|`)}  There's a ${chalk.green(`new version`)} of ${chalk.rgb(255, 71, 133).bold('storybook-aem')}!  ${sb(`|`)}`,
                `  ${sb(`|`)}                                           ${sb(`|`)}`,
                `  ${sb(`|`)}    ${chalk.bold(`Latest:`)}    v${latest}                      ${sb(`|`)}`,
                `  ${sb(`|`)}    ${chalk.red.bold(`Installed: v${installed}`)}                      ${sb(`|`)}`,
                `  ${sb(`|`)}                                           ${sb(`|`)}`,
                `  ${sb(`---------------------------------------------`)}`,
                ``
            ].join('\n'))
        }
    });
}

module.exports = { getLatestVersion, getInstalledVersion, checkVersion }