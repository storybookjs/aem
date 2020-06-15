import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

export default {
  title: 'AEM Title',
  decorators: [
    withKnobs,
  ],
};

export const Title = () => {
  return {
    content: {
      text: text('text', 'Example Title' ),
      type: select('type', [null, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], null),
      linkURL: text('linkURL', 'https://storybook.js.org/' ),
      linkDisabled: boolean('linkDisabled'),
    },
    resourceType: 'core/wcm/components/title/v2/title',  // todo: derive from path
  };
};
