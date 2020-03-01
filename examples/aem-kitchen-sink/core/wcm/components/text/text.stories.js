import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { aemMetadata } from '@storybook/aem';
import MyText from './text.html';
// todo: simplify; include automatically during compilation

export default {
  title: 'Text',
  decorators: [
    withKnobs,
    aemMetadata({
      componentIncludes: ['hello-component'],
      javascriptIncludes: ['hello-javascript'],
      styleIncludes: ['hello-styles'],
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
    props: {
      'jcr:title': 'Text (v2)'
    },
    template: MyText,
  };
};

export const RichText = () => {
  return {
    content: {
      text: text('text', '<h1>Hello, world.</h1>' ),
      isRichText: boolean('isRichText', true),
    },
    props: {
      'jcr:title': 'Text (v2)'
    },
    template: MyText,
  };
};
