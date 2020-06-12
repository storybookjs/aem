import { withKnobs, text } from "@storybook/addon-knobs";
import content from './example_content';

import exampleImage from '../.././../../../../../../example-content/lava-into-ocean.jpeg';
content[":items"].dummyImage.src = exampleImage;

export default {
  title: 'AEM Teaser',
  decorators: [
    withKnobs,
  ],
};

export const Teaser = () => {
  return {
    content: {
      ...content,
      title: text('title', 'Lava flowing into the ocean'),
    },
    resourceType: 'core/wcm/components/teaser/v1/teaser',  // todo: derive from path
  };
};
