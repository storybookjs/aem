import { withKnobs, text } from "@storybook/addon-knobs";
import content from './example_content';

import exampleImage from '../.././../../../../../../example-content/lava-into-ocean.jpeg';
content.src = exampleImage;

export default {
  title: 'AEM Image',
  decorators: [
    withKnobs,
  ],
};

export const Image = () => {
  return {
    content: {
      ...content,
      title: text('title', content.title),
    },
    resourceType: 'core/wcm/components/image/v2/image',  // todo: derive from path
  };
};
