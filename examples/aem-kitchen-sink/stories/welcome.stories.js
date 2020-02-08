import { withLinks } from '@storybook/addon-links';

import './welcome.css';
import welcome from './welcome.html';

import Runtime from './../poc/BrowserRuntime.js';

export default {
  title: 'Welcome',
  decorators: [withLinks],
};

export const Welcome = async () => {
  const runtime = new Runtime();
  return welcome(runtime);
}
