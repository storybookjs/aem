import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { aemMetadata, GenericModel } from '@storybook/aem';

export default {
  title: 'Custom/AEM Text',
  decorators: [
    withKnobs,
    aemMetadata({
      decorationTag: {
        cssClasses: ['text', 'component'],
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
      text: text('text', 'Hello, world.'),
      isRichText: boolean('isRichText', false),
    },
    resourceType: 'components/aemtext',
  };
};

export const RichText = () => {
  return {
    content: {
      text: text('text', '<h1>Hello, world.</h1>'),
      isRichText: boolean('isRichText', true),
    },
    resourceType: 'components/aemtext',
    aemMetadata: {
      decorationTag: null
    },
  };
};