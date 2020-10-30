import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Button',
  decorators: [
    aemMetadata({
      decorationTag: {}
    }),
  ]
};

const resourceType = 'storybook/components/button';

export const Standard = () => ({
  content: {
    "id": "button-93a5672f17",
    "text": "Button",
    ":type": "core/wcm/components/button/v1/button",
    "dataLayer": {
      "button-93a5672f17": {
        "dc:title": "Button",
        "repo:modifyDate": "2018-12-07T12:37:57Z",
        "@type": "core/wcm/components/button/v1/button"
      }
    }
  },
  resourceType: resourceType,
});

export const Linked = () => ({
  content: {
    "id": "button-6a037d80be",
    "text": "Anchor Button",
    "link": "/content/core-components-examples/library/page-authoring/button.html",
    ":type": "core/wcm/components/button/v1/button",
    "dataLayer": {
      "button-6a037d80be": {
        "dc:title": "Anchor Button",
        "repo:modifyDate": "2018-12-07T12:38:48Z",
        "xdm:linkURL": "/content/core-components-examples/library/page-authoring/button.html",
        "@type": "core/wcm/components/button/v1/button"
      }
    }
  },
  resourceType: resourceType,
});

export const Icon = () => ({
  content: {
    "id": "button-1d3ee49e15",
    "text": "Contact Us",
    "icon": "email",
    ":type": "core/wcm/components/button/v1/button",
    "dataLayer": {
      "button-1d3ee49e15": {
        "dc:title": "Contact Us",
        "repo:modifyDate": "2018-12-07T12:38:48Z",
        "@type": "core/wcm/components/button/v1/button"
      }
    }
  },
  resourceType: resourceType,
});