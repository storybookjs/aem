import MyList from './list.html';

export default {
  title: 'List'
};

export const List = () => {
  return {
    // models used to render this component. the model can either be a proper use-class, a
    // content object (model.json) or a resource path.
    // todo: this could further be automated by creating a _ModelLoader_ that is fed with all the use-classes
    models: {
      'com.adobe.cq.wcm.core.components.models.List': require('../../../../models/com.adobe.cq.wcm.core.components.models.List'),
    },
    props: {
      'jcr:title': 'List (v2)'
    },
    template: MyList
  };
};
