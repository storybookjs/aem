import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Form/Hidden',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/form/hidden';

export const HiddenField = () => ({
  content: {
    "id": "asset-url",
    "name": "Asset-URL",
    "value": "asset-url",
    ":type": "core/wcm/components/form/hidden/v2/hidden"
  },
  resourceType: resourceType,
});