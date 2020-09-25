import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { aemMetadata, GenericModel } from '@storybook/aem';
import Template from './include.html';

export default {
  title: 'Include',
  decorators: [
  ],
  parameters: {
  },
};

export const Include = () => {
  return {
    content: {
      text: 'Hello, world.',
    },
    template: Template,
  };
};
