import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Runtime from '@adobe/htlengine/src/runtime/Runtime';

import MyList from './list.html';
import MyItem from './item.html';

export default {
  title: 'List',
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    }
  },
};

export const List = async () => {
  const runtime = new Runtime()
    .withDomFactory(new Runtime.VDOMFactory(window.document.implementation))
    .setGlobal({
      wcmmode: { },
      component: {
        properties: {
          // todo: read from .content.xml
          'jcr:title': 'List (v2)'
        }
      },
      content: {
      }
    });

  // todo: runtime globals are not available in templates
  Object.entries(runtime.globals).forEach(([key, value]) => {
    global[key] = value;
  });
  return await MyList(runtime);
};
