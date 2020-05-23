import content from './example_content';

export default {
  title: 'AEM Button'
};

export const Button = () => {
  return {
    content,
    resourceType: 'core/wcm/components/button/v1/button',  // todo: derive from path
  };
};
