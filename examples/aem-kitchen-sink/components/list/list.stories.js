import { GenericModel } from '@storybook/aem';
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import exampleContent from './example_content';
import ListTemplate from './list.html';

export default {
  title: 'List',
  decorators: [
    withKnobs,
  ],
};

export const List = () => {
  return {
    models: {
      'List': GenericModel,
    },
    content: {
      ...exampleContent,
      showDescription: boolean('showDescription', false),
      showModificationDate: boolean('showModificationDate', false),
      linkItems: boolean('linkItems', false),
    },
    template: ListTemplate,
  };
};
