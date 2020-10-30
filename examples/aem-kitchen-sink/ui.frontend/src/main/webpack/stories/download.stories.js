import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Download',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/download';

export const Standard = () => {
  return {
    content: {
      "url": "/content/dam/core-components-examples/library/sample-assets/lava-into-ocean.jpg.coredownload.jpeg",
      "title": "Lava flowing into the ocean",
      "description": "Lava flowing into the ocean",
      "actionText": "Download",
      "filename": "lava-into-ocean.jpg",
      "format": "image/jpeg",
      "size": "495 KB",
      "extension": "jpeg",
      ":type": "core-components-examples/components/download"
    },
    resourceType: resourceType,
  };
};

export const TitleAndDescription = () => {
  return {
    content: {
      "url": "/content/dam/core-components-examples/library/sample-assets/lava-into-ocean.jpg.coredownload.jpeg",
      "title": "Custom Title",
      "description": "<p>Custom description</p>\r\n",
      "actionText": "Download",
      "filename": "lava-into-ocean.jpg",
      "format": "image/jpeg",
      "size": "495 KB",
      "extension": "jpeg",
      ":type": "core-components-examples/components/download"
    },
    resourceType: resourceType,
  };
};

export const DirectUpload = () => {
  return {
    content: {
      "url": "/content/core-components-examples/library/page-authoring/download/jcr:content/root/responsivegrid/demo_68071479/component/download/file.coredownload.jpeg/lava-into-ocean.jpg",
      "title": "Uploaded Asset",
      "description": "<p>Asset uploaded directly from a local file system</p>\r\n",
      "actionText": "Download",
      "filename": "lava-into-ocean.jpg",
      "format": "image/jpeg",
      "size": "81 KB",
      "extension": "jpeg",
      ":type": "core-components-examples/components/download"
    },
    resourceType: resourceType,
  };
};

export const DisplayInline = () => {
  return {
    content: {
      "url": "/content/dam/core-components-examples/library/sample-assets/lava-into-ocean.jpg.coredownload.inline.jpeg",
      "title": "Lava flowing into the ocean",
      "description": "Lava flowing into the ocean",
      "actionText": "View",
      "filename": "lava-into-ocean.jpg",
      "format": "image/jpeg",
      "size": "495 KB",
      "extension": "jpeg",
      ":type": "core-components-examples/components/download"
    },
    resourceType: resourceType,
  };
};