import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Container',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: [],
        // tagName: 'div'
      }
    }),
  ]
};

const resourceType = 'storybook/components/container';

export const Standard = () => ({
  content: {
    "columnCount": 12,
    "gridClassNames": "aem-Grid aem-Grid--12 aem-Grid--default--12",
    "columnClassNames": {
      "text": "aem-GridColumn aem-GridColumn--default--12",
      "title": "aem-GridColumn aem-GridColumn--default--12"
    },
    "allowedComponents": {
      "applicable": false,
      "components": []
    },
    ":items": {
      "title": {
        "id": "title-8920e7073a",
        "linkDisabled": false,
        "type": "h3",
        "text": "Lorem Ipsum",
        ":type": "core/wcm/components/title/v2/title",
        "dataLayer": {
          "title-8920e7073a": {
            "dc:title": "Lorem Ipsum",
            "repo:modifyDate": "2019-06-11T17:44:18Z",
            "@type": "core/wcm/components/title/v2/title"
          }
        }
      },
      "text": {
        "id": "text-635c878ca1",
        "text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\r\n",
        "richText": true,
        ":type": "core/wcm/components/text/v2/text",
        "dataLayer": {
          "text-635c878ca1": {
            "xdm:text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\r\n",
            "@type": "core/wcm/components/text/v2/text"
          }
        }
      }
    },
    ":itemsOrder": [
      "title",
      "text"
    ],
    ":type": "core/wcm/components/container/v1/container"
  },
  resourceType: resourceType,
});

export const Layout = () => ({
  content: {
    "columnCount": 12,
    "gridClassNames": "aem-Grid aem-Grid--12 aem-Grid--default--12",
    "columnClassNames": {
      "image": "aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--offset--default--0 aem-GridColumn--default--none",
      "text": "aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--offset--default--0 aem-GridColumn--default--none"
    },
    "allowedComponents": {
      "applicable": false,
      "components": []
    },
    ":items": {
      "text": {
        "id": "text-ffbb03c51b",
        "text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\r\n",
        "richText": true,
        ":type": "core/wcm/components/text/v2/text",
        "dataLayer": {
          "text-ffbb03c51b": {
            "xdm:text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\r\n",
            "@type": "core/wcm/components/text/v2/text"
          }
        }
      },
      "image": {
        "id": "image-066a48972a",
        "alt": "Snowy mountain glacier",
        "title": "Snowy mountain glacier",
        "src": "https://www.aemcomponents.dev/content/core-components-examples/library/container/container/_jcr_content/root/responsivegrid/demo_975671829/component/container/image.coreimg.jpeg/1560274820735/snowy-mountain-glacier.jpeg",
        "srcUriTemplate": "https://www.aemcomponents.dev/content/core-components-examples/library/container/container/_jcr_content/root/responsivegrid/demo_975671829/component/container/image.coreimg{.width}.jpeg/1560274820735/snowy-mountain-glacier.jpeg",
        "areas": [],
        "lazyThreshold": 0,
        "uuid": "45c6ee92-90e1-4af2-af69-b6dcbc7daeb7",
        "widths": [],
        "lazyEnabled": false,
        ":type": "core-components-examples/components/image",
        "dataLayer": {
          "image-066a48972a": {
            "image": {
              "@type": "image/jpeg",
              "repo:path": "https://www.aemcomponents.dev/content/dam/core-components-examples/library/sample-assets/snowy-mountain-glacier.jpg",
              "xdm:tags": [],
              "repo:modifyDate": "2019-02-20T14:21:37Z",
              "repo:id": "45c6ee92-90e1-4af2-af69-b6dcbc7daeb7"
            },
            "dc:title": "Snowy mountain glacier",
            "repo:modifyDate": "2019-06-11T17:40:20Z",
            "@type": "core-components-examples/components/image"
          }
        }
      }
    },
    ":itemsOrder": [
      "text",
      "image"
    ],
    ":type": "core/wcm/components/container/v1/container"
  },
  resourceType: resourceType,
});

export const BackgroundColor = () => ({
  content: {
    "columnCount": 12,
    "gridClassNames": "aem-Grid aem-Grid--12 aem-Grid--default--12",
    "columnClassNames": {
      "text": "aem-GridColumn aem-GridColumn--default--12",
      "title": "aem-GridColumn aem-GridColumn--default--12"
    },
    "allowedComponents": {
      "applicable": false,
      "components": []
    },
    ":items": {
      "title": {
        "id": "title-03d5caa475",
        "linkDisabled": false,
        "type": "h3",
        "text": "Lorem Ipsum",
        ":type": "core/wcm/components/title/v2/title",
        "dataLayer": {
          "title-03d5caa475": {
            "dc:title": "Lorem Ipsum",
            "repo:modifyDate": "2019-06-11T17:44:42Z",
            "@type": "core/wcm/components/title/v2/title"
          }
        }
      },
      "text": {
        "id": "text-f24e0f60b7",
        "text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\r\n",
        "richText": true,
        ":type": "core/wcm/components/text/v2/text",
        "dataLayer": {
          "text-f24e0f60b7": {
            "xdm:text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\r\n",
            "@type": "core/wcm/components/text/v2/text"
          }
        }
      }
    },
    ":itemsOrder": [
      "title",
      "text"
    ],
    ":type": "core/wcm/components/container/v1/container"
  },
  resourceType: resourceType,
});

export const BackgroundImage = () => ({
  content: {
    "columnCount": 12,
    "gridClassNames": "aem-Grid aem-Grid--12 aem-Grid--default--12",
    "columnClassNames": {
      "text": "aem-GridColumn aem-GridColumn--default--12",
      "title": "aem-GridColumn aem-GridColumn--default--12"
    },
    "allowedComponents": {
      "applicable": false,
      "components": []
    },
    ":items": {
      "title": {
        "id": "title-1be658ff0e",
        "linkDisabled": false,
        "type": "h3",
        "text": "Lorem Ipsum",
        ":type": "core/wcm/components/title/v2/title",
        "dataLayer": {
          "title-1be658ff0e": {
            "dc:title": "Lorem Ipsum",
            "repo:modifyDate": "2019-06-11T17:45:17Z",
            "@type": "core/wcm/components/title/v2/title"
          }
        }
      },
      "text": {
        "id": "text-f2110b822b",
        "text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\r\n",
        "richText": true,
        ":type": "core/wcm/components/text/v2/text",
        "dataLayer": {
          "text-f2110b822b": {
            "xdm:text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\r\n",
            "@type": "core/wcm/components/text/v2/text"
          }
        }
      }
    },
    ":itemsOrder": [
      "title",
      "text"
    ],
    ":type": "core/wcm/components/container/v1/container"
  },
  resourceType: resourceType,
});

export const Nested = () => ({
  content: {
    "columnCount": 12,
    "gridClassNames": "aem-Grid aem-Grid--12 aem-Grid--default--12",
    "columnClassNames": {
      "title_copy": "aem-GridColumn aem-GridColumn--default--12",
      "container_793091227": "aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--offset--default--0 aem-GridColumn--default--none",
      "text": "aem-GridColumn aem-GridColumn--default--12",
      "container_793091227_": "aem-GridColumn aem-GridColumn--default--6 aem-GridColumn--offset--default--0 aem-GridColumn--default--none"
    },
    "allowedComponents": {
      "applicable": false,
      "components": []
    },
    ":items": {
      "title_copy": {
        "id": "title-bb335a88c9",
        "linkDisabled": false,
        "type": "h3",
        "text": "Lorem Ipsum",
        ":type": "core/wcm/components/title/v2/title",
        "dataLayer": {
          "title-bb335a88c9": {
            "dc:title": "Lorem Ipsum",
            "repo:modifyDate": "2019-06-11T17:47:48Z",
            "@type": "core/wcm/components/title/v2/title"
          }
        }
      },
      "text": {
        "id": "text-ad0bcbf737",
        "text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\n",
        "richText": true,
        ":type": "core/wcm/components/text/v2/text",
        "dataLayer": {
          "text-ad0bcbf737": {
            "xdm:text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\n",
            "@type": "core/wcm/components/text/v2/text"
          }
        }
      },
      "container_793091227": {
        "columnCount": 12,
        "gridClassNames": "aem-Grid aem-Grid--6 aem-Grid--default--6",
        "columnClassNames": {
          "title_copy": "aem-GridColumn aem-GridColumn--default--6",
          "text": "aem-GridColumn aem-GridColumn--default--6"
        },
        "allowedComponents": {
          "applicable": false,
          "components": []
        },
        ":items": {
          "title_copy": {
            "id": "title-bfd588181c",
            "linkDisabled": false,
            "type": "h4",
            "text": "Hac Habitasse",
            ":type": "core/wcm/components/title/v2/title",
            "dataLayer": {
              "title-bfd588181c": {
                "dc:title": "Hac Habitasse",
                "repo:modifyDate": "2019-06-11T17:47:25Z",
                "@type": "core/wcm/components/title/v2/title"
              }
            }
          },
          "text": {
            "id": "text-390c0ed4d8",
            "text": "<p>Hac habitasse platea dictumst quisque sagittis purus. At risus viverra adipiscing at in tellus integer. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Leo vel orci porta non pulvinar neque laoreet suspendisse. Volutpat diam ut venenatis tellus in metus vulputate eu.</p>\n",
            "richText": true,
            ":type": "core/wcm/components/text/v2/text",
            "dataLayer": {
              "text-390c0ed4d8": {
                "xdm:text": "<p>Hac habitasse platea dictumst quisque sagittis purus. At risus viverra adipiscing at in tellus integer. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Leo vel orci porta non pulvinar neque laoreet suspendisse. Volutpat diam ut venenatis tellus in metus vulputate eu.</p>\n",
                "repo:modifyDate": "2019-06-11T17:49:05Z",
                "@type": "core/wcm/components/text/v2/text"
              }
            }
          }
        },
        ":itemsOrder": [
          "title_copy",
          "text"
        ],
        ":type": "core/wcm/components/container/v1/container"
      },
      "container_793091227_": {
        "columnCount": 12,
        "gridClassNames": "aem-Grid aem-Grid--6 aem-Grid--default--6",
        "columnClassNames": {
          "text": "aem-GridColumn aem-GridColumn--default--6",
          "title": "aem-GridColumn aem-GridColumn--default--6"
        },
        "allowedComponents": {
          "applicable": false,
          "components": []
        },
        ":items": {
          "title": {
            "id": "title-6ff30316ee",
            "linkDisabled": false,
            "type": "h4",
            "text": "Libero Id Faucibus",
            ":type": "core/wcm/components/title/v2/title",
            "dataLayer": {
              "title-6ff30316ee": {
                "dc:title": "Libero Id Faucibus",
                "repo:modifyDate": "2019-06-11T17:47:32Z",
                "@type": "core/wcm/components/title/v2/title"
              }
            }
          },
          "text": {
            "id": "text-f9d1a8505f",
            "text": "<p>Libero id faucibus nisl tincidunt eget nullam non nisi. Hac habitasse platea dictumst vestibulum. Viverra orci sagittis eu volutpat odio facilisis mauris. Velit aliquet sagittis id consectetur purus ut. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt.</p>\n",
            "richText": true,
            ":type": "core/wcm/components/text/v2/text",
            "dataLayer": {
              "text-f9d1a8505f": {
                "xdm:text": "<p>Libero id faucibus nisl tincidunt eget nullam non nisi. Hac habitasse platea dictumst vestibulum. Viverra orci sagittis eu volutpat odio facilisis mauris. Velit aliquet sagittis id consectetur purus ut. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt.</p>\n",
                "repo:modifyDate": "2019-06-11T17:49:47Z",
                "@type": "core/wcm/components/text/v2/text"
              }
            }
          }
        },
        ":itemsOrder": [
          "title",
          "text"
        ],
        ":type": "core/wcm/components/container/v1/container"
      }
    },
    ":itemsOrder": [
      "title_copy",
      "text",
      "container_793091227",
      "container_793091227_"
    ],
    ":type": "core/wcm/components/container/v1/container"
  },
  resourceType: resourceType,
});