import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Progress Bar',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/progressbar';

export const Default = () => ({
  content: {
    "id": "progressbar-8b45985e46",
    "completed": 0,
    "remaining": 100,
    ":type": "core-components-examples/components/progressbar",
    "dataLayer": {
      "progressbar-8b45985e46": {
        "repo:modifyDate": "2020-04-13T07:42:23Z",
        "@type": "core-components-examples/components/progressbar"
      }
    }
  },
  resourceType: resourceType,
});

export const CustomProgress = () => ({
  content: {
    "id": "progressbar-3b51f979e5",
    "completed": 33.3,
    "remaining": 66.7,
    ":type": "core-components-examples/components/progressbar",
    "dataLayer": {
      "progressbar-3b51f979e5": {
        "repo:modifyDate": "2020-04-13T08:56:39Z",
        "@type": "core-components-examples/components/progressbar"
      }
    }
  },
  resourceType: resourceType,
});