import { getInstalledVersion } from '../utils/versionCheck';
import { log } from '../utils/logger';

module.exports = async args => {
  log(`Installed Version: ${getInstalledVersion()}`);
};
