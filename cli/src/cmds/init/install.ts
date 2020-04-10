import fs from 'fs';
import path from 'path';
import npm from 'npm';
import ncp from 'ncp';
import { createStory } from '../stories/story';
import { log, getPackageJSON } from '../../utils';

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
    let storybookStoriesDirectory = path.resolve(cwd, answers.storybookStoryLocation);
    if (!fs.existsSync(storybookStoriesDirectory)){
        fs.mkdirSync(storybookStoriesDirectory);
    }
  }

  // TODO Create main.js
  // TODO Create preview.js

  if (answers.createAEMContent) {
    // TODO Create middleware.js
  }

  // TODO Create preview-head.js or otherwise figure out how to include the clientlibs

  // TODO Create the first story.
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
