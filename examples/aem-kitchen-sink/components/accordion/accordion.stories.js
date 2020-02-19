import { withKnobs, text, boolean } from "@storybook/addon-knobs";

// todo: simplify; include automatically during compilation
import Runtime from '@adobe/htlengine/src/runtime/Runtime';
import ResourceResolver from '../../poc/ResourceResolver';
import ComponentLoader from '../../poc/ComponentLoader';
import MyAccordion from './accordion.html';

import exampleContent from './example_content';

export default {
  title: 'Accordion',
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    }
  },
};

export const Accordion = async () => {
  const resolver = new ResourceResolver(exampleContent, new ComponentLoader());
  const runtime = new Runtime()
    .withDomFactory(new Runtime.VDOMFactory(window.document.implementation))
    .withResourceLoader(resolver.createResourceLoader('/'))
    .setGlobal({
      wcmmode: { },
      component: {
        properties: {
          // todo: read from .content.xml
          'jcr:title': 'Accordion (v1)'
        }
      },
      content: exampleContent,
    });

  // todo: runtime globals are not available in templates
  // see https://github.com/adobe/htlengine/issues/133
  Object.entries(runtime.globals).forEach(([key, value]) => {
    global[key] = value;
  });
  return await MyAccordion(runtime);
};
