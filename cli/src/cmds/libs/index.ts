import * as fs from 'fs';
import * as path from 'path';
import * as fsExtra from 'fs-extra';

import prompts from 'prompts';
import { fetchFromAEM, log } from '../../utils';
import { getComponentTypes } from './getComponentTypes';
import { getFileContent } from './getFileContent';
import { getClientlibContent } from './getClientlibContent';
import { createPackageDefinition } from './createPackageDefinition';
import { installPackage } from './installPackage';
import { cacheContent } from '../analyze/cacheContent';

export const libsCommand = async (args, config) => {
  await createPackageDefinition(args, config);
  await installPackage(args, config);

  const htmlQuery = `/bin/querybuilder.json?type=nt:file&nodename=*.html&path=/apps/core/wcm/components&p.limit=-1`;
  const htmlResponse = await fetchFromAEM({ url: htmlQuery });
  const clientlibQuery = `/bin/querybuilder.json?type=cq:ClientLibraryFolder&path=/apps/core/wcm/components&p.limit=-1`;
  const clientlibResponse = await fetchFromAEM({ url: clientlibQuery });
  const htmlData = await htmlResponse.json();
  const clientlibData = await clientlibResponse.json();
  const components = getComponentTypes(htmlData.hits);

  let cache = {};
  console.log(components);
  components.forEach(type => {
    cache[type] = {
      html: {},
      entry: ``,
      clientlibs: {},
    };
  });
  // console.log('HTML: ', htmlData.hits)
  // console.log('ClientLib: ', clientlibData.hits)
  await components.forEach((componentPath)=>{
    fs.mkdir(path.join(config.storybookLocation, `./dependencies/jcr_root/${componentPath}`), { recursive: true }, (err) => {
      if (err) throw err;
    });
  })
  console.log('All component directories have been created!')

  await htmlData.hits.forEach(async (hit)=>{
    const fileContent = await getFileContent(hit);
    fsExtra.outputFile(path.join(config.storybookLocation, `./dependencies/jcr_root${hit.path}`), fileContent, err => {
        if(err) {
          console.log(err);
        } else {
          console.log(`The html file ${hit.path} was saved!`);
      }
    });
  })

  await clientlibData.hits.forEach(async (hit)=>{
    const pathEnd = `${hit.path}`.substring(`${hit.path}`.lastIndexOf('/') + 1);
    if(pathEnd !== 'editor' && pathEnd !== 'editorhook' ){
    const contentObj = await getClientlibContent(hit);
      fsExtra.outputFile(path.join(config.storybookLocation, `./dependencies/jcr_root${contentObj.js.path}`), contentObj.js.content, err => {
        if(err) {
          console.log(err);
        } else {
          console.log(`The clientlib file ${contentObj.js.path} was saved!`);
        }
      });
      fsExtra.outputFile(path.join(config.storybookLocation, `./dependencies/jcr_root${contentObj.css.path}`), contentObj.css.content, err => {
        if(err) {
            console.log(err);
        } else {
            console.log(`The clientlib file ${contentObj.css.path} was saved!`);
        }
      });
    }
  })

  const cachePath = path.join(config.storybookLocation, `.aem-cache.js`);
  const content = `export default ${JSON.stringify(cache, null, 2)};`;
  // console.log(cache)
  // cacheContent(content, config)
};
