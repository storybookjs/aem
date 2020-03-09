import exampleContent from './example_content';

export default {
  title: 'AEM List'
};

export const List = () => {
  return {
    // models used to render this component.
    // todo: this could further be automated by creating a _ModelLoader_ that is fed with all the use-classes
    models: {
      'com.adobe.cq.wcm.core.components.models.List': require('../../../../models/com.adobe.cq.wcm.core.components.models.List'),
    },
    content: exampleContent,
    resourceType: 'core/wcm/components/list',  // todo: derive from path
  };
};
