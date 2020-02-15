import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import MyAccordion from './accordion.html';
import exampleContent from './example_content';

export default {
  title: 'Accordion',
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    }
  },
};

export const Accordion = () => {
  return {
    content: exampleContent,
    props: {
      'jcr:title': 'Accordion (v1)'
    },
    resourceLoaderPath: '/',
    template: MyAccordion
  };
};
