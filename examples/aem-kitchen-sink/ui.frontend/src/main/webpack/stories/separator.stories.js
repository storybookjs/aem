import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Separator',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/separator';

export const Standard = () => ({
  content: {
    ":type": "core/wcm/components/separator/v1/separator"
  },
  resourceType: resourceType,
});