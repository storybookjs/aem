import { aemMetadata } from '@storybook/aem';
import content from './example_content';

export default {
  title: 'AEM Tabs',
  decorators: [
    aemMetadata({
      decorationTag: {
        cssClasses: ['tabs','component'],
        tagName: 'article'
      }
    }),
  ]
};

export const Tabs = () => {
  return {
    content,
    resourceType: 'core/wcm/components/tabs/v1/tabs',  // todo: derive from path
  };
};
