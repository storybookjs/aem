import content from './example_content';

export default {
  title: 'AEM List'
};

export const List = () => {
  return {
    content,
    resourceType: 'core/wcm/components/list/v2/list',  // todo: derive from path
  };
};
