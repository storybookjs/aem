import { withKnobs, text } from '@storybook/addon-knobs';

export default {
  title: 'AEM Form Button',
  decorators: [
    withKnobs,
  ],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const FormButtonV2 = () => {
  return {
    content: {
      'name'               : text('name', 'name1'),
      'value'              : text('Value', 'value1'),
      'type'               : text('Type', 'button'),
      'id'                 : text('id', 'button-id'),
      'helpMessage'        : text('helpMessage', 'my help message')
    },
    resourceType: 'core/wcm/components/form/button/v2/button',  // todo: derive from path
  };
};