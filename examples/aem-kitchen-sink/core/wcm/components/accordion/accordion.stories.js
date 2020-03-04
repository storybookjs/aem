import exampleContent from './example_content';
import { aemMetadata } from '@storybook/aem';
require('./clientlibs/site/css/accordion.css');
require('./clientlibs/site/js/accordion.js');
require('./clientlibs/site/js/polyfills.js');

export default {
  title: 'Accordion',
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
    content: exampleContent,
    props: {
      'jcr:title': 'Accordion (v1)'
    },
    resourceLoaderPath: '/',
    resourceType: 'core/wcm/components/accordion',  // todo: derive from path
  };
};
