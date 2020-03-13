import exampleContent from './example_content';
import { aemMetadata, GenericModel } from '@storybook/aem';

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
    // models used to render this component.
    // todo: this could further be automated by creating a _ModelLoader_ that is fed with all the use-classes
    models: {
      'Accordion': GenericModel,
      'Text': GenericModel,
    },
    content: exampleContent,

    // this example just specifies the resource type and let's the renderer automatically load
    // the correct HTL template and render it,
    resourceType: 'components/accordion',
  };
};
