import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import middlewareFileTemplate from './templates/middleware';
import previewFileTemplate from './templates/preview';
import mainFileTemplate from './templates/main';
import { log, getPackageJSON } from '../../utils';

const writeFilePromise = promisify(fs.writeFile);
const cwd = process.cwd();

export default async answers => {
  const packageJSONPath = path.resolve(cwd, 'package.json');
  const packageJSON = getPackageJSON(packageJSONPath);

  packageJSON['@storybook/aem-cli'] = answers;
  packageJSON.scripts.storybook = 'start-storybook -p 4501';

  log('Updating your package.json.');
  fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));

  const packages = ['@storybook/aem', '@storybook/aem-cli'];

  if (answers.storybookLocation) {
    const storybookDirectory = path.resolve(cwd, answers.storybookLocation);
    if (!fs.existsSync(storybookDirectory)) {
      fs.mkdirSync(storybookDirectory);
    }
  }

  if (answers.storybookStoryLocation) {
    const storybookStoriesDirectory = path.resolve(cwd, answers.storybookStoryLocation);
    if (!fs.existsSync(storybookStoriesDirectory)) {
      fs.mkdirSync(storybookStoriesDirectory);
    }
  }

  // TODO Create preview-head.js or otherwise figure out how to include the clientlibs

  const mainFilePath = path.resolve(cwd, answers.storybookLocation, 'main.js');
  if (!fs.existsSync(mainFilePath)) {
    await writeFilePromise(
      mainFilePath,
      mainFileTemplate({
        storyPath: path.join(
          path.relative(answers.storybookLocation, answers.storybookStoryLocation),
          '**',
          '*.stories.*'
        ),
      })
    );
  }

  const previewFilePath = path.resolve(cwd, answers.storybookLocation, 'preview.js');
  if (!fs.existsSync(previewFilePath)) {
    await writeFilePromise(previewFilePath, previewFileTemplate());
  }

  if (answers.createAEMContent) {
    packages.push('http-proxy-middleware');
    packages.push('storybook-aem-wrappers');

    const middlewareFilePath = path.resolve(cwd, answers.storybookLocation, 'middleware.js');
    if (!fs.existsSync(middlewareFilePath)) {
      await writeFilePromise(middlewareFilePath, middlewareFileTemplate());
    }
  }

  if (answers.storybookAEMGrid) {
    packages.push('storybook-aem-grid');
  }

  if (answers.storybookAEMStyleSystem) {
    packages.push('storybook-aem-style-system');
  }

  return packages;
};
