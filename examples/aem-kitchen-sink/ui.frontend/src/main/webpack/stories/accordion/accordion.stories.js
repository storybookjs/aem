import { aemMetadata } from '@storybook/aem';
import ExpandedItemJSON from './ExpandedItem.json';
import ExpandedItemsJSON from './ExpandedItems.json';
import NestedJSON from './Nested.json';
import SampleContentJSON from './SampleContent.json'
import SingleExpansionJSON from './SingleExpansion.json'
import StandardJSON from './Standard.json';

export default {
  title: 'Core Components/Accordion',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/accordion';

export const Standard = () => ({
  content: StandardJSON,
  resourceType: resourceType,
});

export const SampleContent = () => ({
  content: SampleContentJSON,
  resourceType: resourceType,
});

export const ExpandedItem = () => ({
  content: ExpandedItemJSON,
  resourceType: resourceType,
});

export const ExpandedItems = () => ({
  content: ExpandedItemsJSON,
  resourceType: resourceType,
});

export const SingleExpansion = () => ({
  content: SingleExpansionJSON,
  resourceType: resourceType,
});

export const Nested = () => ({
  content: NestedJSON,
  resourceType: resourceType,
});