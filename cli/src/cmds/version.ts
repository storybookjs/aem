import { getInstalledVersion, log } from '../utils';

export const Version = async args => {
  log(`Installed Version: ${getInstalledVersion()}`);
};
