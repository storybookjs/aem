import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: 'AEM Separator',
  decorators: [
    withKnobs
  ],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const Separator = () => {
  return {
    content: {
      id: text('id', 'unique-id'),
    },
    resourceType: 'core/wcm/components/separator/v1/separator',  // todo: derive from path
  };
};
