import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Social Sharing',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/sharing';

export const Standard = () => ({
  content: {
    "facebookEnabled": true,
    "pinterestEnabled": true,
    "socialMediaEnabled": true,
    "metadata": {
      "og:title": "Social Sharing",
      "og:url": "https://publish-p7704-e12962.adobeaemcloud.com/content/core-components-examples/library/page-authoring/social-sharing.json",
      "og:type": "website",
      "og:site_name": "Core Components",
      "og:image": "https://publish-p7704-e12962.adobeaemcloud.com/content/core-components-examples/library/page-authoring/social-sharing.thumb.800.480.png?ck=1579187717",
      "og:description": "Add social sharing links"
    },
    ":type": "core-components-examples/components/sharing",
    "hasFacebookSharing": true,
    "hasPinteresSharing": true
  },
  resourceType: resourceType,
});