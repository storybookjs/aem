import { aemMetadata } from '@storybook/aem';
import DefaultActiveItemJSON from './DefaultActiveItem.json';
import NestedJSON from './Nested.json';
import SampleContentJSON from './SampleContent.json'
import StandardJSON from './Standard.json';

export default {
  title: 'Core Components/Tabs',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/tabs';

export const Standard = () => ({
  content: StandardJSON,
  resourceType: resourceType,
});

export const SampleContent = () => ({
  content: SampleContentJSON,
  resourceType: resourceType,
});

export const DefaultActiveItem = () => ({
  content: DefaultActiveItemJSON,
  resourceType: resourceType,
});

export const Nested = () => ({
  content: NestedJSON,
  resourceType: resourceType,
});