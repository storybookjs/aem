import { withKnobs, text } from "@storybook/addon-knobs";
import { aemMetadata } from '@storybook/aem';
import PersonTemplate from './person.html';

// todo: simplify; include automatically during compilation

export default {
  title: 'Person',
  decorators: [
    withKnobs,
    aemMetadata({
      decorationTag: {
        cssClasses: ['person','component'],
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
  'person': require('../../models/person'),
};

export const Person = () => {
  return {
    models,
    // note: you can use knobs to alter content data!
    content: {
      firstName: text('First Name', 'John' ),
      lastName: text('Last Name', 'Doe' ),
    },
    props: {
      'jcr:title': 'Person Component'
    },
    template: PersonTemplate,
  };
};
