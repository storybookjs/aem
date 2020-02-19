import { withLinks } from '@storybook/addon-links';

import './welcome.css';
import welcome from './welcome.html';

import Runtime from '@adobe/htlengine/src/runtime/Runtime';

export default {
  title: 'Welcome',
  decorators: [withLinks],
};

export const Welcome = async () => {
  const runtime = new Runtime()
    .withDomFactory(new Runtime.VDOMFactory(window.document.implementation));
  return welcome(runtime);
};
