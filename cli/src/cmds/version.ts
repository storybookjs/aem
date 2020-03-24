const { getInstalledVersion } = require('../utils/versionCheck');
const log = require('../utils/logger');

module.exports = async args => {
  log(`Installed Version: ${getInstalledVersion()}`);
};
