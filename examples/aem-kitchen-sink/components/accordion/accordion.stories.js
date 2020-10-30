import exampleContent from './example_content';
import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Custom/Accordion',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: ['accordion', 'component'],
        tagName: 'article'
      }
    }),
  ]
};

export const Accordion = () => {
  return {
    content: exampleContent,
    // this example just specifies the resource type and let's the renderer automatically load
    // the correct HTL template and render it,
    resourceType: 'components/accordion',
  };
};