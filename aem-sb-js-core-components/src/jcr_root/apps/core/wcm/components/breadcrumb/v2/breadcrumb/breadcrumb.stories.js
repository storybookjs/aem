import { aemMetadata } from '@storybook/aem';
import { withKnobs, number, boolean } from "@storybook/addon-knobs";
import content from './example_content';

export default {
  title: 'AEM Breadcrumb',
  decorators: [
    withKnobs,
    aemMetadata({
      decorationTag: {
        cssClasses: ['breadcrumb','component'],
        tagName: 'article'
      }
    }),
  ]
};

export const Breadcrumb = () => {
  // this is kind of a hack, since in AEM the breadcrumb is included in the header w/o a backing content
  // and/or it is styled with the designer: todo: verify how this is usually done
  content.startLevel = number('startLevel', 1, {
    range: true,
    min: 0,
    max: 10,
    step: 1,
  });
  content.showHidden = boolean('showHidden');
  content.hideCurrent = boolean('hideCurrent');

  return {
    resourceLoaderPath: '/content/en/products/outdoor/hiking',
    content,
    resourceType: 'core/wcm/components/breadcrumb/v2/breadcrumb',  // todo: derive from path
  };
};
