import { aemMetadata } from '@storybook/aem';
import ElementsJSON from './Elements.json';
import OrderByAndSortOrderJSON from './OrderByAndSortOrder.json';
import StandardJSON from './Standard.json';
import TagsJSON from './Tags.json';

export default {
  title: 'Core Components/Content Fragment List',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/contentfragmentlist';

export const Standard = () => ({
  content: StandardJSON,
  resourceType: resourceType,
});

export const OrderByAndSortOrder = () => ({
  content: OrderByAndSortOrderJSON,
  resourceType: resourceType,
});

export const Tags = () => ({
  content: TagsJSON,
  resourceType: resourceType,
});

export const Elements = () => ({
  content: ElementsJSON,
  resourceType: resourceType,
});