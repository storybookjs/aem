import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { aemMetadata, GenericModel } from '@storybook/aem';
import TextTemplate from './text.html';

export default {
  title: 'Text',
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
    template: TextTemplate,
  };
};

export const RichText = () => {
  return {
    content: {
      text: text('text', '<h1>Hello, world.</h1>' ),
      isRichText: boolean('isRichText', true),
    },
    template: TextTemplate,
    aemMetadata: {
      decorationTag: null
    },
  };
};
