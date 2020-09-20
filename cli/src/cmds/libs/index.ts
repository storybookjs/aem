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
import { getContentXml } from './getContentXml';

// this has a problem because we will get duplicates of local files
const clientLibRegex = /(data-sly-use.templates|data-sly-use.clientlib)="((?:\\.|[^"\\])*)"/g;
const quoteRegex = /"((?:\\.|[^"\\])*)"/g;
const htmlQuery = `/bin/querybuilder.json?type=nt:file&nodename=*.html&path=/apps/core/wcm/components&p.limit=-1`;
const clientlibQuery = `/bin/querybuilder.json?type=cq:ClientLibraryFolder&path=/apps/core/wcm/components&p.limit=-1`;

let foundClientLibPaths = new Set()

export const libsCommand = async (args, config) => {
  await deleteDependencies(config);
  await createPackageDefinition(args, config);
  await installPackage(args, config);

  const htmlResponse = await fetchFromAEM({ url: htmlQuery });
  const clientlibResponse = await fetchFromAEM({ url: clientlibQuery });
  const htmlData = await htmlResponse.json();
  const clientlibData = await clientlibResponse.json();
  const components = getComponentTypes(htmlData.hits);

  await components.forEach((componentPath) => {
    if (!isEditorFile(componentPath)) {
      fs.mkdir(path.join(config.storybookLocation, path.join('./dependencies', componentPath)), { recursive: true }, (err) => {
        if (err) throw err;
      });
      saveContentXml(componentPath, config)
    }
  })
  console.log('All component directories have been created!')

  await htmlData.hits.forEach(async (hit) => {
    recursiveFunction(hit, config)
  })
  console.log('All component HTML files been created!')


  await clientlibData.hits.forEach(async (hit) => {
    if (!isEditorFile(hit.path)) {
      const contentObj = await getClientlibContent(hit);
      const jsPathEnd = `${contentObj.js.path}`.substring(`${contentObj.js.path}`.lastIndexOf('/') + 1);
      const cssPathEnd = `${contentObj.css.path}`.substring(`${contentObj.css.path}`.lastIndexOf('/') + 1);
      writeToFile(`${contentObj.js.path.replace(jsPathEnd, `js/ `)}${jsPathEnd}`, contentObj.js.content, config);
      writeClientLibTxtFile(`js`, `${contentObj.js.path.replace(jsPathEnd, ``)}/js.txt`, jsPathEnd, config);
      writeToFile(`${contentObj.css.path.replace(cssPathEnd, `css/ `)}${cssPathEnd}`, contentObj.css.content, config);
      writeClientLibTxtFile(`css`, `${contentObj.css.path.replace(cssPathEnd, ``)}/css.txt`, cssPathEnd, config);
    }
  })
  console.log('All component ClientLib files been created!')
  createComponentsRootFile(config, components)
  createConfigFile(config);
  createIndexFile(config);
};

export const recursiveFunction = async (hit, config) => {
  const fileContent = await getFileContent(hit);
  const matches = fileContent.match(clientLibRegex);

  if (matches) {
    matches.forEach(async match => {
      const newMatch = match.match(quoteRegex);
      if (newMatch && newMatch[0]) {
        const value = newMatch[0].replace(/["]+/g, '');
        if (!isEditorFile(hit.path) && !foundClientLibPaths.has(value)) {
          foundClientLibPaths.add(value);
          const pathEnd = `${value}`.substring(`${value}`.lastIndexOf('/') + 1);
          const ext = pathEnd.split('.')[1];
          if (ext === 'html') {
            writeToFile(value, await getFileContent({ path: value }), config);
            recursiveFunction({ path: value }, config);
          } else if ((ext === 'js' || ext === 'css') && !isEditorFile(value)) {
            const content = await getFileContent({ path: value });
            writeToFile(`${value.replace(pathEnd, `${ext}/ `)}${pathEnd}`, content, config);
            writeClientLibTxtFile(ext, `${value.replace(pathEnd, ``)}${pathEnd.split('.')[0]}`, pathEnd, config);
          }
        }
      }
    });
  }
  if (!isEditorFile(hit.path) && !foundClientLibPaths.has(hit.path)) {
    writeToFile(hit.path, fileContent, config);
  }
}

export const writeClientLibTxtFile = async (ext, filePath, fileContent, config) => {
  // check if file exists
  if (fs.existsSync(filePath)) {
    // if file exists concat
    fs.appendFileSync(filePath, `${fileContent}\r`);
  } else {
    // if file doesnt exist create and write to file
    await fsExtra.outputFile(path.join(config.storybookLocation, path.join('./dependencies', filePath)), `#base=${ext}\r${fileContent}\r`, err => {
        if (err) {
          console.log(err);
        }
    });
  }
}

export const writeToFile = async (filePath, fileContent, config) => {
  // check if file exists
  if (fs.existsSync(filePath)) {
    // if file exists concat
    fs.appendFileSync(filePath, fileContent);
  } else {
    // if file doesnt exist create and write to file
    await fsExtra.outputFile(path.join(config.storybookLocation, path.join('./dependencies', filePath)), fileContent, err => {
      if (err) {
        console.log(err);
      }

    });
  }
}

export const saveContentXml = async (componentPath, config) => {
  const location = path.join(componentPath, `.content.xml`);
  const contentXml = await getContentXml({ path: `${componentPath.replace(/\/$/, "")}.json` });
  writeToFile(location, contentXml, config);
}

export const isEditorFile = (path) => {
  const pathEnd = `${path}`.substring(`${path}`.lastIndexOf('/') + 1);
  return pathEnd === 'editor' || pathEnd === 'editorhook' || pathEnd === 'childreneditor' || path.indexOf('/editor/') > -1;
}

export const deleteDependencies = async (config) => {
  await fsExtra.remove(path.join(config.storybookLocation, './dependencies'), { recursive: true });
  console.log('Removed all dependencies!')
}

export const createComponentsRootFile = async (config, components) => {
  let content = `module.exports = [`
  await components.forEach(componentPath => {
      if(!isEditorFile(componentPath)) {
        const requirePath = path.join(componentPath, `.content.xml`);
        content = content.concat(`require('.${requirePath}'),`);
      }
  });
  content = content.concat('];')
  writeToFile('components.js', content, config);
  console.log('Created components root file!')
}

export const createConfigFile = (config) => {
  const content = `
  const path = require('path');
  AEMRegisterJcrRoot(path.resolve(__dirname, '.'));
  `
  writeToFile('config.js', content, config);
  console.log('Created config file!')
}

export const createIndexFile = (config) => {
  const content = `
  module.exports = {
    components: require('./components.js'),
  };`
  writeToFile('index.js', content, config);
  console.log('Created index file!')
}