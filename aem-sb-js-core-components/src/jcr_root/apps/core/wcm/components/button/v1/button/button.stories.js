import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: 'AEM Button',
  decorators: [
    withKnobs
  ],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const Button = () => {
  return {
    content: {
      link: text('Link', 'https://www.adobe.com'),
      icon: text('Icon', 'adobe'),
      text: text('Text', 'Hello world'),
    },
    resourceType: 'core/wcm/components/button/v1/button',  // todo: derive from path
  };
};
