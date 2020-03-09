import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { aemMetadata, GenericModel } from '@storybook/aem';
import TextTemplate from './text.html';

// todo: simplify; include automatically during compilation

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

// models used to render this component.
const models = {
  'Text': GenericModel,
};

export const Text = () => {
  return {
    models,
    // note: you can use knobs to alter content data!
    content: {
      text: text('text', 'Hello, world.' ),
      isRichText: boolean('isRichText', false),
    },
    props: {
      'jcr:title': 'Text (v2)'
    },
    template: TextTemplate,
  };
};

export const RichText = () => {
  return {
    models,
    // note: you can use knobs to alter content data!
    content: {
      text: text('text', '<h1>Hello, world.</h1>' ),
      isRichText: boolean('isRichText', true),
    },
    props: {
      'jcr:title': 'Text (v2)'
    },
    template: TextTemplate,
    aemMetadata: {
      decorationTag: null
    },
  };
};
