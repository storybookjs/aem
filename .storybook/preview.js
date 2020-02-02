import { addParameters, addDecorator } from '../app/aem/src/client/index.ts';
import { withA11y } from '@storybook/addon-a11y';

addDecorator(withA11y);

addParameters({
  a11y: {
    config: {},
    options: {
      checks: { 'color-contrast': { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },
  options: {
    showRoots: true,
  },
  docs: {
    iframeHeight: '200px',
  },
});
