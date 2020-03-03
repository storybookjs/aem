import exampleContent from './example_content';
import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Accordion',
  decorators: [
    aemMetadata({
      javascriptIncludes: [
        require('./clientlibs/site/js/accordion.js'),
        require('./clientlibs/site/js/polyfills.js')
      ],
      styleIncludes: [require('./clientlibs/site/css/accordion.css')],
      decorationTag: {
        cssClasses: ['text','component'],
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
