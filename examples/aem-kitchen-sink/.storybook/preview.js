import { addParameters, addDecorator } from '@storybook/client-api';
import { withA11y } from '@storybook/addon-a11y';
import { aemMetadata, GenericModel } from '@storybook/aem';

import AEMCoreComponents from 'aem-js-core-components';

addDecorator(withA11y);
addDecorator(aemMetadata({
  components: [
    require('../components/accordion/.content.xml'),
    require('../components/list/.content.xml'),
    require('../components/text/.content.xml'),
    require('../components/aemtext/.content.xml'),
    ...AEMCoreComponents.components,
  ],
  models: {
    'Accordion': GenericModel,
    'Text': GenericModel,
    'List': GenericModel,
    'person': require('../models/person'),
    ...AEMCoreComponents.models,
  }
}));

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
