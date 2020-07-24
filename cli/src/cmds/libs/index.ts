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
import * as minify from 'minify';

// this has a problem because we will get duplicates of local files
const clientLibRegex = /(data-sly-use.templates|data-sly-use.clientlib)="((?:\\.|[^"\\])*)"/g;
const quoteRegex = /"((?:\\.|[^"\\])*)"/g;

let foundClientLibPaths = new Set()

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

  await components.forEach((componentPath)=>{
    if(!isEditorFile(componentPath)) {
      fs.mkdir(path.join(config.storybookLocation, path.join('./dependencies', componentPath)), { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
  })
  console.log('All component directories have been created!')

  await htmlData.hits.forEach(async (hit)=>{
    recursiveFunction(hit, config)
  })
  console.log('All component HTML files been created!')


  await clientlibData.hits.forEach(async (hit)=>{
    if(!isEditorFile(hit.path)){
      const contentObj = await getClientlibContent(hit);
      writeToFile(contentObj.js.path, contentObj.js.content, config);
      writeToFile(contentObj.css.path, contentObj.css.content, config);
    }
  })
  console.log('All component ClientLib files been created!')
};


export const writeToFile = async (filePath, fileContent, config) => {
  await fsExtra.outputFile(path.join(config.storybookLocation, path.join('./dependencies/jcr_root', filePath)), fileContent, err => {
    if(err) {
      console.log(err);
    }
  });
}

export const recursiveFunction = async (hit, config) => {
    const fileContent = await getFileContent(hit);
    const matches = fileContent.match(clientLibRegex);
    
    if(matches) {
      matches.forEach(async match => {
        const newMatch = match.match(quoteRegex);
        if(newMatch && newMatch[0]) {
          const value = newMatch[0].replace(/["]+/g, '');
          if(!isEditorFile(hit.path) && !foundClientLibPaths.has(value))  {
            foundClientLibPaths.add(value);
            const pathEnd = `${value}`.substring(`${value}`.lastIndexOf('/') + 1);
            const ext = pathEnd.split('.')[1];
            if(ext === 'html') {
              writeToFile(value, await getFileContent({ path: value }), config);
              recursiveFunction({ path: value }, config);
            } else if(ext === 'js' || ext === 'css') {
              if(pathEnd !== 'editor' && pathEnd !== 'editorhook' ){
                const contentObj = await getFileContent({ path: value });
                writeToFile(contentObj.js.path, contentObj.js.content, config);
                writeToFile(contentObj.css.path, contentObj.css.content, config);
              }
            }
          }
        }
      });
    }
    if(!isEditorFile(hit.path) && !foundClientLibPaths.has(hit.path))  {
      writeToFile(hit.path, fileContent, config);
    }
}

export const isEditorFile = (path) => {
  const pathEnd = `${path}`.substring(`${path}`.lastIndexOf('/') + 1);
  return pathEnd === 'editor' || pathEnd === 'editorhook' || path.indexOf('/editor/') > -1;
}