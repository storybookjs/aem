import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import MyText from './text.html';
// todo: simplify; include automatically during compilation

export default {
  title: 'Text',
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    }
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
    decorationTag: {
      cssClasses: ['text','component'],
      tagName: 'article'
    }
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
    decorationTag: null
  };
};

export const StringTest = () => {
  return {
    content: {
      isRichText: boolean('Re Render Toggle', true),
    },
    template: `<h1>Flat HTML Hello World</h1>`,
  };
};
