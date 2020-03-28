const { getInstalledVersion, log } = require('../utils');

module.exports = async args => {
  log(`Installed Version: ${getInstalledVersion()}`);
};
