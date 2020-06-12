import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import content from './example_content';

import exampleImage from '../.././../../../../../../example-content/lava-into-ocean.jpeg';
content[":items"].dummyImage.src = exampleImage;

export default {
  title: 'AEM Teaser',
  decorators: [
    withKnobs,
  ],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const Teaser = () => {
  return {
    content: {
      ...content,
      title: text('title', content.title),
      pretitle: text('pretitle', content.pretitle),
      description: text('description', content.description),
      titleType: select('titleType', [null, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], null),
      actionsEnabled: boolean('actionsEnabled', content.actionsEnabled),
      titleLinkHidden: boolean('titleLinkHidden', content.titleLinkHidden),
      imageLinkHidden: boolean('imageLinkHidden', content.imageLinkHidden),
    },
    resourceType: 'core/wcm/components/teaser/v1/teaser',  // todo: derive from path
  };
};
