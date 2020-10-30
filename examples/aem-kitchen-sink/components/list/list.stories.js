import { withKnobs, boolean } from "@storybook/addon-knobs";
import exampleContent from './example_content';
import ListTemplate from './list.html';

export default {
  title: 'Custom/List',
  decorators: [
    withKnobs,
  ],
};

export const List = () => {
  return {
    content: {
      ...exampleContent,
      showDescription: boolean('showDescription', false),
      linkItems: boolean('linkItems', false),
    },
    template: ListTemplate,
  };
};