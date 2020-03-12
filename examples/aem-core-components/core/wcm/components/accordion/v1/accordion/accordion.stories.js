import { aemMetadata } from '@storybook/aem';
import content from './example_content';
import models from '../../../../../../models/index.js';

console.log(models);
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
    models,
    content,
    resourceType: 'core/wcm/components/accordion/v1/accordion',  // todo: derive from path
  };
};
