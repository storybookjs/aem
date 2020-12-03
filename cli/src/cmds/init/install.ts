import npm from 'npm';
import { log } from '../../utils';

export default packages => {
  npm.load({ loaded: false }, err => {
    if (err) throw err;

    log('Installing Storybook dependencies');
    npm.commands.install(packages, (installError, data) => {
      if (installError) throw installError;
    });

    npm.on('log', message => console.log(message));
    log('When installation is complete, run `npm run storybook` to start storybook on port 4501');
  });
};
