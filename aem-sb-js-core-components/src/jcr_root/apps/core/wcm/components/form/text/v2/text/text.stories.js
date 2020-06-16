import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import content from './example_content';

export default {
  title: 'AEM Form Text',
  decorators: [
    withKnobs
  ],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const Text = () => {
  return {
    content,
    resourceType: 'core/wcm/components/form/text/v2/text',  // todo: derive from path
  };
};