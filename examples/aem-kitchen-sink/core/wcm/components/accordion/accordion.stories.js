import exampleContent from './example_content';
import { aemMetadata } from '@storybook/aem';

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
    // models used to render this component. the model can either be a proper use-class, a
    // content object (model.json) or a resource path.
    // todo: this could further be automated by creating a _ModelLoader_ that is fed with all the use-classes
    models: {
      'com.adobe.cq.wcm.core.components.models.Accordion': require('../../../../models/com.adobe.cq.wcm.core.components.models.Accordion'),
      'com.adobe.cq.wcm.core.components.models.Text': require('../../../../models/com.adobe.cq.wcm.core.components.models.Text'),
    },
    content: exampleContent,
    props: {
      'jcr:title': 'Accordion (v1)'
    },
    resourceLoaderPath: '/',
    resourceType: 'core/wcm/components/accordion',  // todo: derive from path
  };
};
