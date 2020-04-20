import { withKnobs, boolean } from "@storybook/addon-knobs";
import ListTemplate from './list.html';
import Schema from './list.schema';
import { contentFromSchema } from '../../.storybook/schema';

export default {
  title: 'List',
  decorators: [
    withKnobs,
  ],
};

export const List = () => ({
  content: contentFromSchema(Schema(),{
    linkItems: true,
    ":items": [{
      "title": "test"
    },{},{}]
  }, true),
  template: ListTemplate,
});

export const ListWithLinks = () => ({
    content: contentFromSchema(Schema(),{
      linkItems: true,
      ":items": [{},{},{},{},{}]
    }, true),
    template: ListTemplate,
});

export const ListWithDescription = () => ({
    content: contentFromSchema(Schema(),{
      showDescription: true,
      ":items": [{},{},{},{},{},{},{},{},{}]
    }, true),
    template: ListTemplate,
});

export const ListWithModificationDate = () => ({
    content: contentFromSchema(Schema(),{
      showModificationDate: true,
      ":items": [{},{},{},{},{},{}]
    }, true),
    template: ListTemplate,
});

export const ListWithLinksAndDescription = () => ({
    content: contentFromSchema(Schema(),{
      linkItems: true,
      showDescription: true,
      ":items": [{},{},{},{},{}]
    }, true),
    template: ListTemplate,
});

export const ListWithLinksDescriptionAndModificationDate = () => ({
    content: contentFromSchema(Schema(),{
      linkItems: true,
      showDescription: true,
      showModificationDate: true,
      ":items": [{},{},]
    }, true),
    template: ListTemplate,
});
