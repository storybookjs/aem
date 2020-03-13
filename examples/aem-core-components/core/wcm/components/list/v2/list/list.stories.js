import content from './example_content';
import models from '../../../../../../models';

export default {
  title: 'AEM List'
};

export const List = () => {
  return {
    models,
    content,
    resourceType: 'core/wcm/components/list/v2/list',  // todo: derive from path
  };
};
