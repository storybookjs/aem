import { aemMetadata } from '@storybook/aem';
import content from './example_content';

export default {
  title: 'AEM Accordion',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: ['accordion','component'],
        tagName: 'article'
      }
    }),
  ]
};

export const Accordion = () => {
  return {
    content,
    resourceType: 'core/wcm/components/accordion/v1/accordion',  // todo: derive from path
  };
};
