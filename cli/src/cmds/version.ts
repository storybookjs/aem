const { getInstalledVersion } = require('../utils/versionCheck');
const logger2 = require('../utils/logger');

module.exports = async args => {
  logger2(`Installed Version: ${getInstalledVersion()}`);
};
