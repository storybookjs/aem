import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Title',
  decorators: [
    aemMetadata({
      decorationTag: {}
    }),
  ]
};

const resourceType = 'storybook/components/title';

export const Standard = () => ({
  content: {
    "id": "title-e8a4f1e792",
    "linkDisabled": false,
    "type": "h1",
    "text": "Title",
    ":type": "core/wcm/components/title/v2/title",
    "dataLayer": {
      "title-e8a4f1e792": {
        "dc:title": "Title",
        "repo:modifyDate": "2018-12-07T12:50:54Z",
        "@type": "core/wcm/components/title/v2/title"
      }
    }
  },
  resourceType: resourceType,
});

export const Text = () => ({
  content: {
    "id": "title-b358cbbf54",
    "linkDisabled": false,
    "type": "h1",
    "text": "Lorem Ipsum",
    ":type": "core/wcm/components/title/v2/title",
    "dataLayer": {
      "title-b358cbbf54": {
        "dc:title": "Lorem Ipsum",
        "repo:modifyDate": "2018-12-07T12:53:27Z",
        "@type": "core/wcm/components/title/v2/title"
      }
    }
  },
  resourceType: resourceType,
});

export const HeadingType = () => ({
  content: {
    "id": "title-fb961975b2",
    "linkDisabled": false,
    "type": "h3",
    "text": "Heading 3",
    ":type": "core/wcm/components/title/v2/title",
    "dataLayer": {
      "title-fb961975b2": {
        "dc:title": "Heading 3",
        "repo:modifyDate": "2018-12-07T12:52:17Z",
        "@type": "core/wcm/components/title/v2/title"
      }
    }
  },
  resourceType: resourceType,
});

export const Linked = () => ({
  content: {
    "id": "title-aca6b2bbfb",
    "linkDisabled": false,
    "type": "h1",
    "linkURL": "/content/core-components-examples/library/page-authoring/title.html",
    "text": "Title",
    ":type": "core/wcm/components/title/v2/title",
    "dataLayer": {
      "title-aca6b2bbfb": {
        "dc:title": "Title",
        "repo:modifyDate": "2020-04-29T13:45:41Z",
        "xdm:linkURL": "/content/core-components-examples/library/page-authoring/title.html",
        "@type": "core/wcm/components/title/v2/title"
      }
    }
  },
  resourceType: resourceType,
});