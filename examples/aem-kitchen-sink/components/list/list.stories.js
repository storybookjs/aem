import { withKnobs, text, boolean, array } from "@storybook/addon-knobs";
import ListTemplate from './list.html';

export default {
  title: 'List',
  decorators: [
    withKnobs,
  ],
};

export const BasicList = () => {
  return {
    content: {
      ":type": "components/list",
      "showDescription": boolean('showDescription', false, 'List'),
      "showModificationDate": boolean('showModificationDate', false, 'List'),
      "linkItems": boolean('linkItems', false, 'List'),
      "items": [
        {
          "lastModified": 1572285728871,
          "description": text('Description', 'From the hippie beaches of Ocean Beach to the ritzy shores of La Jolla and everywhere in between. Discover the San Diego surf scene.', 'Item 1'),
          "url": text('URL', 'https://www.sandiego.com/', 'Item 1'),
          "title": text('Title', 'San Diego Surf Spots', 'Item 1'),
        },
        {
          "lastModified": 1572285728543,
          "description": text('Description', 'Learn about our ski touring experience and how it differs from traditional downhill skiing and even backcountry skiing.', 'Item 2'),
          "url": text('URL', 'http://www.norpine.com/', 'Item 2'),
          "title": text('Title', 'Ski Touring', 'Item 2'),
        },
        {
          "lastModified": 1572285728434,
          "description": text('Description', 'The Australian West coast is a camper’s heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you’ll find anywhere in the world.', 'Item 3'),
          "url": text('URL', 'https://www.australia.com/', 'Item 3'),
          "title": text('Title', 'Western Australia', 'Item 3'),
        },
        {
          "lastModified": 1572285728305,
          "description": text('Description', 'We traveled to Northern Norway to document the joy of surfing in extreme, but breathtakingly beautiful conditions.', 'Item 4'),
          "url": text('URL', 'https://www.arcticsurfers.com/', 'Item 4'),
          "title": text('Title', 'Arctic Surfing', 'Item 4'),
        }
      ]
    },
    template: ListTemplate,
  };
};

export const ListWithDescription = () => {
  return {
    content: {
      ":type": "components/list",
      "showDescription": boolean('showDescription', true, 'List'),
      "showModificationDate": boolean('showModificationDate', false, 'List'),
      "linkItems": boolean('linkItems', false, 'List'),
      "items": [
        {
          "lastModified": 1572285728871,
          "description": text('Description', 'From the hippie beaches of Ocean Beach to the ritzy shores of La Jolla and everywhere in between. Discover the San Diego surf scene.', 'Item 1'),
          "url": text('URL', 'https://www.sandiego.com/', 'Item 1'),
          "title": text('Title', 'San Diego Surf Spots', 'Item 1'),
        },
        {
          "lastModified": 1572285728543,
          "description": text('Description', 'Learn about our ski touring experience and how it differs from traditional downhill skiing and even backcountry skiing.', 'Item 2'),
          "url": text('URL', 'http://www.norpine.com/', 'Item 2'),
          "title": text('Title', 'Ski Touring', 'Item 2'),
        },
        {
          "lastModified": 1572285728434,
          "description": text('Description', 'The Australian West coast is a camper’s heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you’ll find anywhere in the world.', 'Item 3'),
          "url": text('URL', 'https://www.australia.com/', 'Item 3'),
          "title": text('Title', 'Western Australia', 'Item 3'),
        },
        {
          "lastModified": 1572285728305,
          "description": text('Description', 'We traveled to Northern Norway to document the joy of surfing in extreme, but breathtakingly beautiful conditions.', 'Item 4'),
          "url": text('URL', 'https://www.arcticsurfers.com/', 'Item 4'),
          "title": text('Title', 'Arctic Surfing', 'Item 4'),
        }
      ]
    },
    template: ListTemplate,
  };
};

//TODO: url !== URL - URL is being using in the htl but the generic model is including it as lowecase so its not working as expected
export const ListWithLinksDoesntWorkSeeTODOInCode = () => {
  return {
    content: {
      ":type": "components/list",
      "showDescription": boolean('showDescription', false, 'List'),
      "showModificationDate": boolean('showModificationDate', false, 'List'),
      "linkItems": boolean('linkItems', true, 'List'),
      "items": [
        {
          "lastModified": 1572285728871,
          "description": text('Description', 'From the hippie beaches of Ocean Beach to the ritzy shores of La Jolla and everywhere in between. Discover the San Diego surf scene.', 'Item 1'),
          "url": text('URL', 'https://www.sandiego.com/', 'Item 1'),
          "title": text('Title', 'San Diego Surf Spots', 'Item 1'),
        },
        {
          "lastModified": 1572285728543,
          "description": text('Description', 'Learn about our ski touring experience and how it differs from traditional downhill skiing and even backcountry skiing.', 'Item 2'),
          "url": text('URL', 'http://www.norpine.com/', 'Item 2'),
          "title": text('Title', 'Ski Touring', 'Item 2'),
        },
        {
          "lastModified": 1572285728434,
          "description": text('Description', 'The Australian West coast is a camper’s heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you’ll find anywhere in the world.', 'Item 3'),
          "url": text('URL', 'https://www.australia.com/', 'Item 3'),
          "title": text('Title', 'Western Australia', 'Item 3'),
        },
        {
          "lastModified": 1572285728305,
          "description": text('Description', 'We traveled to Northern Norway to document the joy of surfing in extreme, but breathtakingly beautiful conditions.', 'Item 4'),
          "url": text('URL', 'https://www.arcticsurfers.com/', 'Item 4'),
          "title": text('Title', 'Arctic Surfing', 'Item 4'),
        }
      ]
    },
    template: ListTemplate,
  };
};
