import exampleContent from './example_content';

export default {
  title: 'Accordion',
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
