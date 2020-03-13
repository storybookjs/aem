import { aemMetadata } from '@storybook/aem';
import { withKnobs, text, boolean, array } from "@storybook/addon-knobs";


export default {
  title: 'Accordion',
  decorators: [
    withKnobs,
    aemMetadata({
      decorationTag: {
        cssClasses: ['accordion','component'],
        tagName: 'article'
      }
    }),
  ],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const BasicAccordion = () => {
  return {
    content: {
      ":type": "components/accordion",
      "headingElement": "h1",
      "singleExpansion": boolean('Single expansion', false, 'Accordion'),
      "expandedItems": array('Expanded Items(comma delimeted - Ex. item_1,item_2,...)', [], ',', 'Accordion'),
      ":items": {
        "item_1": {
          ":type": "components/text",
          "title": text('Title', 'Title 1', 'Item 1'),
          "text": text('Text', 'Accordion Item 1', 'Item 1'),
          "textIsRich": boolean('Is rich text?', false, 'Item 1'),
        },
        "item_2": {
          ":type": "components/text",
          "title": text('Title', 'Title 2', 'Item 2'),
          "text": text('Text', 'Accordion Item 2', 'Item 2'),
          "textIsRich": boolean('Is rich text?', false, 'Item 2'),
        },
        "item_3": {
          ":type": "components/text",
          "title": text('Title', 'Title 3', 'Item 3'),
          "text": text('Text', 'Accordion Item 3', 'Item 3'),
          "textIsRich": boolean('Is rich text?', false, 'Item 3'),
        }
      }
    },
    resourceType: 'components/accordion',
  };
};

export const AccordionWithSingleExpansion = () => {
  return {
    content: {
      ":type": "components/accordion",
      "headingElement": "h1",
      "singleExpansion": boolean('Single expansion', true, 'Accordion'),
      "expandedItems": array('Expanded Items(comma delimeted - Ex. item_1,item_2,...)', [], ',', 'Accordion'),
      ":items": {
        "item_1": {
          ":type": "components/text",
          "title": text('Title', 'Title 1', 'Item 1'),
          "text": text('Text', 'Accordion Item 1', 'Item 1'),
          "textIsRich": boolean('Is rich text?', false, 'Item 1'),
        },
        "item_2": {
          ":type": "components/text",
          "title": text('Title', 'Title 2', 'Item 2'),
          "text": text('Text', 'Accordion Item 2', 'Item 2'),
          "textIsRich": boolean('Is rich text?', false, 'Item 2'),
        },
        "item_3": {
          ":type": "components/text",
          "title": text('Title', 'Title 3', 'Item 3'),
          "text": text('Text', 'Accordion Item 3', 'Item 3'),
          "textIsRich": boolean('Is rich text?', false, 'Item 3'),
        }
      }
    },
    resourceType: 'components/accordion',
  };
};

export const AccordionWithStartingExpandedItems = () => {
  return {
    content: {
      ":type": "components/accordion",
      "headingElement": "h1",
      "singleExpansion": boolean('Single expansion', false, 'Accordion'),
      "expandedItems": array('Expanded Items(comma delimeted - Ex. item_1,item_2,...)', ['item_1','item_3'], ',', 'Accordion'),
      ":items": {
        "item_1": {
          ":type": "components/text",
          "title": text('Title', 'Title 1', 'Item 1'),
          "text": text('Text', 'Accordion Item 1', 'Item 1'),
          "textIsRich": boolean('Is rich text?', false, 'Item 1'),
        },
        "item_2": {
          ":type": "components/text",
          "title": text('Title', 'Title 2', 'Item 2'),
          "text": text('Text', 'Accordion Item 2', 'Item 2'),
          "textIsRich": boolean('Is rich text?', false, 'Item 2'),
        },
        "item_3": {
          ":type": "components/text",
          "title": text('Title', 'Title 3', 'Item 3'),
          "text": text('Text', 'Accordion Item 3', 'Item 3'),
          "textIsRich": boolean('Is rich text?', false, 'Item 3'),
        }
      }
    },
    resourceType: 'components/accordion',
  };
};
