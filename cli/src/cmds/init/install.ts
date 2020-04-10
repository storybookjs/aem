import fs from 'fs';
import path from 'path';
import npm from 'npm';
import ncp from 'ncp';
import middlewareFileTemplate from './templates/middleware';
import previewFileTemplate from './templates/preview';
import mainFileTemplate from './templates/main';
import { promisify } from 'util';
import { createStory } from '../stories/story';
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

  if (answers.storybookLocation) {
    let storybookDirectory = path.resolve(cwd, answers.storybookLocation);
    if (!fs.existsSync(storybookDirectory)){
      fs.mkdirSync(storybookDirectory);
    }
  }

  if (answers.storybookStoryLocation) {
    const storybookStoriesDirectory = path.resolve(cwd, answers.storybookStoryLocation);
    if (!fs.existsSync(storybookStoriesDirectory)){
      fs.mkdirSync(storybookStoriesDirectory);
    }
  }

  const mainFilePath = path.resolve(cwd, answers.storybookLocation, 'main.js');
  if (!fs.existsSync(mainFilePath)){
    await writeFilePromise(mainFilePath, mainFileTemplate({
      storyPath: path.join(path.relative(answers.storybookLocation, answers.storybookStoryLocation), '**', '*.stories.*')
    }));
  }

  const previewFilePath = path.resolve(cwd, answers.storybookLocation, 'preview.js');
  if (!fs.existsSync(previewFilePath)){
    await writeFilePromise(previewFilePath, previewFileTemplate());
  }

  if (answers.createAEMContent) {
    const middlewareFilePath = path.resolve(cwd, answers.storybookLocation, 'middleware.js');
    if (!fs.existsSync(middlewareFilePath)){
      await writeFilePromise(middlewareFilePath, middlewareFileTemplate());
    }
  }

  // TODO Create preview-head.js or otherwise figure out how to include the clientlibs

  log('Lets create your first story');
  await createStory([], answers);

  let packages = [
    '@storybook/aem',
    '@storybook/aem-cli',
    'http-proxy-middleware',
    'storybook-aem-grid',
    'storybook-aem-style-system',
    'storybook-aem-wrappers',
  ];

  npm.load({ loaded: false }, (err) => {
    if (err) throw err;

    log('Installing Storybook dependencies');
    npm.commands.install(packages, (installError, data) => {
      if (installError) throw installError;
    });

    npm.on('log', (message) => console.log(message));
    log('When installation is complete, run `npm run storybook` to start storybook on port 4501');
  });

  return answers;
};
