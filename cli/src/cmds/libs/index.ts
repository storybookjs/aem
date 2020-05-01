import { writeFile } from 'fs';
import { join } from 'path';
import { fetchFromAEM, log } from '../../utils';
import { getComponentTypes } from './getComponentTypes';
import { getFileContent } from './getFileContent';
import { getClientlibContent } from './getClientlibContent';

export const libsCommand = async (args, config) => {
  const htmlQuery = `/bin/querybuilder.json?type=nt:file&nodename=*.html&path=/apps/core/wcm/components&p.limit=-1`;
  const htmlResponse = await fetchFromAEM({ url: htmlQuery });
  const clientlibQuery = `/bin/querybuilder.json?type=cq:ClientLibraryFolder&path=/apps/core/wcm/components&p.limit=-1`;
  const clientlibResponse = await fetchFromAEM({ url: clientlibQuery });
  const htmlData = await htmlResponse.json();
  const clientlibData = await clientlibResponse.json();
  const components = getComponentTypes(htmlData.hits);

  let cache = {};
  components.forEach(type => {
    cache[type] = {
      html: {},
      entry: ``,
      js: ``,
      css: ``,
    };
  });

  cache = {
    ...cache,
    ...(await getFileContent(htmlData.hits, cache)),
    ...(await getClientlibContent(clientlibData.hits, cache)),
  };

  const cachePath = join(config.storybookLocation, `.aem-cache.js`);
  const content = `export default ${JSON.stringify(cache, null, 2)};`;

  writeFile(cachePath, content, err => {
    if (err) throw new Error(`Error writing cache file, ${err}`);
    log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    log(` Successfully wrote to cache: ${cachePath}`);
    log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
  });
};
