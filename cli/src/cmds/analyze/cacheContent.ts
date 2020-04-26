import { writeFile } from 'fs';
import { join } from 'path';
import { log } from '../../utils';

export const cacheContent = (fileContents, config) => {
  const cachePath = join(config.storybookLocation, `.aem-cache.js`);
  const content = `export default ${JSON.stringify(fileContents, null, 2)};`;
  writeFile(cachePath, content, err => {
    if (err) throw new Error(`Error writing cache file, ${err}`);
    log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    log(` Successfully wrote to cache: ${cachePath}`);
    log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
  });
};
