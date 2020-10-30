import { aemMetadata } from '@storybook/aem';
import BuiltFromChildPagesJSON from './BuiltFromChildPages.json';
import BuiltFromFixedListJSON from './BuiltFromFixedList.json';
import BuiltFromSearchJSON from './BuiltFromSearch.json';
import BuiltFromTagsJSON from './BuiltFromTags.json';
import OrderJSON from './Order.json';
import MaxItemsJSON from './MaxItems.json';
import ItemsWithLinkDescriptionAndDateJSON from './ItemsWithLinkDescriptionAndDate.json';

export default {
  title: 'Core Components/List',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/list';

export const BuiltFromChildPages = () => {
  return {
    content: BuiltFromChildPagesJSON,
    resourceType: resourceType,
  };
};

export const BuiltFromFixedList = () => {
  return {
    content: BuiltFromFixedListJSON,
    resourceType: resourceType,
  };
};

export const BuiltFromSearch = () => {
  return {
    content: BuiltFromSearchJSON,
    resourceType: resourceType,
  };
};

export const BuiltFromTags = () => {
  return {
    content: BuiltFromTagsJSON,
    resourceType: resourceType,
  };
};

export const Order = () => {
  return {
    content: OrderJSON,
    resourceType: resourceType,
  };
};

export const MaxItems = () => {
  return {
    content: MaxItemsJSON,
    resourceType: resourceType,
  };
};

export const ItemsWithLinkDescriptionAndDate = () => {
  return {
    content: ItemsWithLinkDescriptionAndDateJSON,
    resourceType: resourceType,
  };
};