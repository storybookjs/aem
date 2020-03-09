import exampleContent from './example_content';
import { aemMetadata, GenericModel } from '@storybook/aem';

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
    // models used to render this component.
    // todo: this could further be automated by creating a _ModelLoader_ that is fed with all the use-classes
    models: {
      'com.adobe.cq.wcm.core.components.models.Accordion': require('../../../../models/com.adobe.cq.wcm.core.components.models.Accordion'),
      'com.adobe.cq.wcm.core.components.models.Text': require('../../../../models/com.adobe.cq.wcm.core.components.models.Text'),
    },
    content: exampleContent,
    resourceLoaderPath: '/',
    resourceType: 'core/wcm/components/accordion',  // todo: derive from path
  };
};

export const AccordionWithGenericModel = () => {
  return {
    // models used to render this component.
    // todo: this could further be automated by creating a _ModelLoader_ that is fed with all the use-classes
    models: {
      'com.adobe.cq.wcm.core.components.models.Accordion': GenericModel,
      'com.adobe.cq.wcm.core.components.models.Text': GenericModel,
    },
    content: exampleContent,
    resourceType: 'core/wcm/components/accordion',  // todo: derive from path
  };
};
