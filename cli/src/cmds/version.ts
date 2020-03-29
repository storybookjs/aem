import { getInstalledVersion, log } from '../utils';

export const version = async args => {
  log(`Installed Version: ${getInstalledVersion()}`);
};
