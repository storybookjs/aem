import { writeFile } from 'fs';
import { join } from 'path';
import { fetchFromAEM, log } from '../../utils';
import { getComponentTypes } from './getComponentTypes';
import { getFileContent } from './getFileContent';

export const libsCommand = async (args, config) => {
  const url = `/bin/querybuilder.json?type=nt:file&nodename=*.html&path=/apps/core/wcm/components&p.limit=-1`;
  const response = await fetchFromAEM({ url });
  const data = await response.json();
  const components = await getComponentTypes(data.hits);
  const fileContent = await getFileContent(data.hits);

  const cachePath = join(config.storybookLocation, `.aem-cache.js`);
  const content = `export default ${JSON.stringify(fileContent, null, 2)};`;
  writeFile(cachePath, content, err => {
    if (err) throw new Error(`Error writing cache file, ${err}`);
    log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    log(` Successfully wrote to cache: ${cachePath}`);
    log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
  });
};
