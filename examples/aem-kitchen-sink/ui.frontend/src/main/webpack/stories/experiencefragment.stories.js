import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Experience Fragment',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/experiencefragment';

export const Standard = () => ({
  content: {
    "localizedFragmentVariationPath": "/content/experience-fragments/core-components-examples/library/simple-experience-fragment/master/jcr:content",
    "configured": true,
    ":items": {
      "root": {
        "columnCount": 12,
        "gridClassNames": "aem-Grid aem-Grid--12 aem-Grid--default--12",
        "columnClassNames": {
          "image": "aem-GridColumn aem-GridColumn--default--12",
          "text": "aem-GridColumn aem-GridColumn--default--12"
        },
        "allowedComponents": {
          "applicable": false,
          "components": []
        },
        ":items": {
          "text": {
            "id": "text-39a42f5799",
            "text": "<p>Lava forming some rock.</p>\r\n",
            "richText": true,
            ":type": "core/wcm/components/text/v2/text"
          },
          "image": {
            "id": "image-9139a00e91",
            "alt": "Gray lava rock formation",
            "title": "Gray lava rock formation",
            "src": "/content/experience-fragments/core-components-examples/library/simple-experience-fragment/master/_jcr_content/root/image.coreimg.jpeg/1563369501810/lava-rock-formation.jpeg",
            "srcUriTemplate": "/content/experience-fragments/core-components-examples/library/simple-experience-fragment/master/_jcr_content/root/image.coreimg{.width}.jpeg/1563369501810/lava-rock-formation.jpeg",
            "areas": [],
            "lazyThreshold": 0,
            "uuid": "c58c09f6-e382-4698-bfbd-e8c8d37712c8",
            "widths": [],
            "lazyEnabled": false,
            ":type": "core-components-examples/components/image"
          }
        },
        ":itemsOrder": [
          "text",
          "image"
        ],
        ":type": "wcm/foundation/components/responsivegrid"
      }
    },
    "classNames": "aem-xf",
    ":itemsOrder": [
      "root"
    ],
    ":type": "core/wcm/components/experiencefragment/v1/experiencefragment"
  },
  resourceType: resourceType,
});