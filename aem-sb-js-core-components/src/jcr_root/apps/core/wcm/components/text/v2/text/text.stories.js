import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { aemMetadata } from '@storybook/aem';

export default {
  title: 'AEM Text',
  decorators: [
    withKnobs,
    aemMetadata({
      decorationTag: {
        cssClasses: ['text','component'],
        tagName: 'article'
      }
    }),
  ],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const Text = () => {
  return {
    content: {
      text: text('text', 'Hello, world.' ),
      isRichText: boolean('isRichText', false),
    },
    resourceType: 'core/wcm/components/text/v2/text',  // todo: derive from path
  };
};

export const RichText = () => {
  return {
    content: {
      text: text('text', '<h1>Hello, world.</h1>' ),
      isRichText: boolean('isRichText', true),
    },
    resourceType: 'core/wcm/components/text/v2/text',  // todo: derive from path
    aemMetadata: {
      decorationTag: null
    },
  };
};
