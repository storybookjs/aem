import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Teaser',
  decorators: [
    aemMetadata({
      decorationTag: {}
    }),
  ]
};

const resourceType = 'storybook/components/teaser';

export const PretitleTitleAndDescription = () => ({
  content: {
    "id": "teaser-61035a52f1",
    "pretitle": "Pretitle",
    "title": "Teaser Title",
    "description": "<p>Teaser Description</p>\r\n",
    "actionsEnabled": false,
    "imageLinkHidden": false,
    "titleLinkHidden": false,
    "actions": [],
    ":type": "core-components-examples/components/teaser",
    "dataLayer": {
      "teaser-61035a52f1": {
        "dc:description": "<p>Teaser Description</p>\r\n",
        "dc:title": "Teaser Title",
        "repo:modifyDate": "2019-12-08T10:05:56Z",
        "@type": "core-components-examples/components/teaser"
      }
    }
  },
  resourceType: resourceType,
});

export const ImagePretitleTitleAndDescription = () => ({
  content: {
    "id": "teaser-5c7e0ef90d",
    "pretitle": "Pretitle",
    "title": "Teaser Title",
    "description": "<p>Teaser Description</p>\r\n",
    "actionsEnabled": false,
    "imageLinkHidden": false,
    "titleLinkHidden": false,
    "actions": [],
    "imagePath": "/content/core-components-examples/library/page-authoring/teaser/_jcr_content/root/responsivegrid/demo_1160408466/component/teaser.coreimg.jpeg/1575799718580/lava-into-ocean.jpeg",
    ":type": "core-components-examples/components/teaser",
    "dataLayer": {
      "teaser-5c7e0ef90d": {
        "dc:description": "<p>Teaser Description</p>\r\n",
        "dc:title": "Teaser Title",
        "repo:modifyDate": "2019-12-08T10:08:38Z",
        "@type": "core-components-examples/components/teaser"
      }
    }
  },
  resourceType: resourceType,
});

export const Linked = () => ({
  content: {
    "id": "teaser-c0294248db",
    "title": "Linked Teaser",
    "description": "<p>Teaser Description</p>\r\n",
    "linkURL": "/content/core-components-examples/library/page-authoring/teaser.html",
    "actionsEnabled": false,
    "imageLinkHidden": false,
    "titleLinkHidden": false,
    "actions": [],
    "imagePath": "/content/core-components-examples/library/page-authoring/teaser/_jcr_content/root/responsivegrid/demo_1789748122/component/teaser.coreimg.jpeg/1550672498426/lava-rock-formation.jpeg",
    ":type": "core-components-examples/components/teaser",
    "dataLayer": {
      "teaser-c0294248db": {
        "dc:description": "<p>Teaser Description</p>\r\n",
        "dc:title": "Linked Teaser",
        "repo:modifyDate": "2018-12-07T12:39:46Z",
        "xdm:linkURL": "/content/core-components-examples/library/page-authoring/teaser.html",
        "@type": "core-components-examples/components/teaser"
      }
    }
  },
  resourceType: resourceType,
});

export const CallToActionButton = () => ({
  content: {
    "id": "teaser-83a73ada4e",
    "title": "Teaser Title",
    "description": "<p>Teaser Description</p>\r\n",
    "linkURL": "/content/core-components-examples/library/page-authoring/teaser.html",
    "actionsEnabled": true,
    "imageLinkHidden": false,
    "titleLinkHidden": false,
    "actions": [{
      "id": "teaser-83a73ada4e-cta-ed267738cb",
      "url": "/content/core-components-examples/library/page-authoring/teaser.html",
      "title": "Call To Action",
      "dataLayer": {
        "teaser-83a73ada4e-cta-ed267738cb": {
          "dc:title": "Call To Action",
          "xdm:linkURL": "/content/core-components-examples/library/page-authoring/teaser.html",
          "@type": "nt:unstructured"
        }
      },
      ":type": "nt:unstructured"
    }],
    "imagePath": "/content/core-components-examples/library/page-authoring/teaser/_jcr_content/root/responsivegrid/demo_1878698139/component/teaser.coreimg.jpeg/1550673081151/mountain-range.jpeg",
    ":type": "core-components-examples/components/teaser",
    "dataLayer": {
      "teaser-83a73ada4e": {
        "dc:description": "<p>Teaser Description</p>\r\n",
        "dc:title": "Teaser Title",
        "repo:modifyDate": "2018-12-07T12:42:40Z",
        "xdm:linkURL": "/content/core-components-examples/library/page-authoring/teaser.html",
        "@type": "core-components-examples/components/teaser"
      }
    }
  },
  resourceType: resourceType,
});

export const MultipleCallToActionButton = () => ({
  content: {
    "id": "teaser-561632a539",
    "title": "Teaser Title",
    "description": "<p>Teaser Description</p>\r\n",
    "linkURL": "/content/core-components-examples/library/page-authoring/teaser.html",
    "actionsEnabled": true,
    "imageLinkHidden": false,
    "titleLinkHidden": false,
    "actions": [{
        "id": "teaser-561632a539-cta-d939c6ba30",
        "url": "/content/core-components-examples/library/page-authoring/teaser.html",
        "title": "Call To Action",
        "dataLayer": {
          "teaser-561632a539-cta-d939c6ba30": {
            "dc:title": "Call To Action",
            "xdm:linkURL": "/content/core-components-examples/library/page-authoring/teaser.html",
            "@type": "nt:unstructured"
          }
        },
        ":type": "nt:unstructured"
      },
      {
        "id": "teaser-561632a539-cta-2e27cc6ee5",
        "url": "/content/core-components-examples/library.html",
        "title": "Call To Action",
        "dataLayer": {
          "teaser-561632a539-cta-2e27cc6ee5": {
            "dc:title": "Call To Action",
            "xdm:linkURL": "/content/core-components-examples/library.html",
            "@type": "nt:unstructured"
          }
        },
        ":type": "nt:unstructured"
      }
    ],
    "imagePath": "/content/core-components-examples/library/page-authoring/teaser/_jcr_content/root/responsivegrid/demo_1581767054/component/teaser_2781767054.coreimg.jpeg/1550672497135/snowy-mountain-glacier.jpeg",
    ":type": "core-components-examples/components/teaser",
    "dataLayer": {
      "teaser-561632a539": {
        "dc:description": "<p>Teaser Description</p>\r\n",
        "dc:title": "Teaser Title",
        "repo:modifyDate": "2018-12-07T12:42:09Z",
        "xdm:linkURL": "/content/core-components-examples/library/page-authoring/teaser.html",
        "@type": "core-components-examples/components/teaser"
      }
    }
  },
  resourceType: resourceType,
});

export const TitleandDescriptionFromLinkedPage = () => ({
  content: {
    "id": "teaser-efcb7219a9",
    "title": "Teaser",
    "description": "Link an image and text",
    "linkURL": "/content/core-components-examples/library/page-authoring/teaser.html",
    "actionsEnabled": false,
    "imageLinkHidden": false,
    "titleLinkHidden": false,
    "actions": [],
    ":type": "core-components-examples/components/teaser",
    "dataLayer": {
      "teaser-efcb7219a9": {
        "dc:description": "Link an image and text",
        "dc:title": "Teaser",
        "repo:modifyDate": "2018-12-07T12:43:16Z",
        "xdm:linkURL": "/content/core-components-examples/library/page-authoring/teaser.html",
        "@type": "core-components-examples/components/teaser"
      }
    }
  },
  resourceType: resourceType,
});