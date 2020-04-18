import { withKnobs, boolean } from "@storybook/addon-knobs";
import ListTemplate from './list.html';
import { schema } from './list.stories.schema';

export default {
  title: 'List',
  decorators: [
    withKnobs,
  ],
};

export const List = () => ({
  content: schema({
    ":items": 4
  }, true),
  template: ListTemplate,
});

export const ListWithLinks = () => ({
    content: schema({
      linkItems: true,
      ":items": 5
    }, true),
    template: ListTemplate,
});

export const ListWithDescription = () => ({
    content: schema({
      showDescription: true,
      ":items": 10
    }, true),
    template: ListTemplate,
});

export const ListWithModificationDate = () => ({
    content: schema({
      showModificationDate: true,
      ":items": 10
    }, true),
    template: ListTemplate,
});

export const ListWithLinksAndDescription = () => ({
    content: schema({
      linkItems: true,
      showDescription: true,
      ":items": 2
    }, true),
    template: ListTemplate,
});

export const ListWithLinksDescriptionAndModificationDate = () => ({
    content: schema({
      linkItems: true,
      showDescription: true,
      showModificationDate: true,
      ":items": 4
    }, true),
    template: ListTemplate,
});
