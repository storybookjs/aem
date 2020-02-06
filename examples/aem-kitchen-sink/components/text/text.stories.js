import { document } from 'global';
import Runtime from './BrowserRuntime.js';

import MyText from './text.html';

export default {
  title: 'Text',
};

export const Text = async () => {
  const runtime = new Runtime();
  global.wcmmode = {
    edit: true,
  };
  return await MyText(runtime);
};

