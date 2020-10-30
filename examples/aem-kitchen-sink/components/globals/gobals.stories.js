import { withKnobs, text } from "@storybook/addon-knobs";
import { aemMetadata } from '@storybook/aem';
import Template from './globals.html';

export default {
  title: 'Custom/Globals',
  decorators: [
    withKnobs,
  ],
};

export const Globals = () => {
  return {
    content: {
      text: text('text', 'Hello, world.'),
    },
    template: Template,
  };
};