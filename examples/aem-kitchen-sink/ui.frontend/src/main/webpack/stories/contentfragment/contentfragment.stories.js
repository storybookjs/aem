import { aemMetadata } from '@storybook/aem';
import ElementsJSON from './Elements.json';
import StandardJSON from './Standard.json';
import StructuredContentFragmentJSON from './StructuredContentFragment.json';
import VariationsJSON from './Variations.json';

export default {
  title: 'Core Components/Content Fragment',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/contentfragment';

export const Standard = () => ({
  content: StandardJSON,
  resourceType: resourceType,
});

export const Variations = () => ({
  content: VariationsJSON,
  resourceType: resourceType,
});

export const StructuredContentFragment = () => ({
  content: StructuredContentFragmentJSON,
  resourceType: resourceType,
});

export const Elements = () => ({
  content: ElementsJSON,
  resourceType: resourceType,
});