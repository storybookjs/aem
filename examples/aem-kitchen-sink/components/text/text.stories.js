import { withKnobs, text, boolean } from "@storybook/addon-knobs";

// todo: simplify; include automatically during compilation
import Runtime from '@adobe/htlengine/src/runtime/Runtime';

import MyText from './text.html';

export default {
  title: 'Text',
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    }
  },
};

export const Text = async () => {
  const runtime = new Runtime()
    .withDomFactory(new Runtime.VDOMFactory(window.document.implementation))
    .setGlobal({
      wcmmode: { },
      component: {
        properties: {
          // todo: read from .content.xml
          'jcr:title': 'Text (v2)'
        }
      },
      content: {
        text: text('text', 'Hello, world.' ),
        isRichText: boolean('isRichText', false),
      }
    });

  // todo: runtime globals are not available in templates
  // see https://github.com/adobe/htlengine/issues/133
  Object.entries(runtime.globals).forEach(([key, value]) => {
    global[key] = value;
  });
  return await MyText(runtime);
};
