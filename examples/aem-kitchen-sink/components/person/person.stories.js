import { withKnobs, text } from "@storybook/addon-knobs";
import { aemMetadata } from '@storybook/aem';
import PersonTemplate from './person.html';

// todo: simplify; include automatically during compilation

export default {
  title: 'Custom/Person',
  decorators: [
    withKnobs,
    aemMetadata({
      decorationTag: {
        cssClasses: ['person', 'component'],
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

export const Person = () => {
  return {
    content: {
      firstName: text('First Name', 'John'),
      lastName: text('Last Name', 'Doe'),
    },
    props: {
      'jcr:title': 'Person Component'
    },
    template: PersonTemplate,
  };
};