import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { aemMetadata } from '@storybook/aem';
import MyText from './text.html';
// todo: simplify; include automatically during compilation

export default {
  title: 'Text',
  decorators: [
    withKnobs,
    aemMetadata({
      decorationTag: {
        cssClasses: ['text','component'],
        tagName: 'article'
      }
    }),
  ],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

// models used to render this component. the model can either be a proper use-class, a
// content object (model.json) or a resource path.
// todo: this could further be automated by creating a _ModelLoader_ that is fed with all the use-classes
const models = {
  'com.adobe.cq.wcm.core.components.models.Text': require('../../../../models/com.adobe.cq.wcm.core.components.models.Text'),
};

export const Text = () => {
  return {
    models,
    // note: you can use knobs to alter content data!
    content: {
      text: text('text', 'Hello, world.' ),
      isRichText: boolean('isRichText', false),
    },
    template: MyText,
  };
};

export const RichText = () => {
  return {
    models,
    // note: you can use knobs to alter content data!
    content: {
      text: text('text', '<h1>Hello, world.</h1>' ),
      isRichText: boolean('isRichText', true),
    },
    template: MyText,
    aemMetadata: {
      decorationTag: null
    },
  };
};

export const StringTest = () => {
  return {
    content: {
      isRichText: boolean('Re Render Toggle', true),
    },
    template: `<h1>Flat HTML Hello World</h1>`,
  };
};

export const TextWithModelJson = () => {
  return {
    // example of using a generic model, backed with inline model.json data.
    // note: you can use knobs to alter model data!
    models: {
      'com.adobe.cq.wcm.core.components.models.Text': {
        text: text('text', 'Hello, world.' ),
        isRichText: false,
      }
    },
    content: {
      text: text('text', 'Hello, world.' ),
      isRichText: false,
    },
    template: MyText,
    noDecoration: true
  };
};

export const TextWithModelFromContent = () => {
  return {
    // example of using a generic model, backed with content
    models: {
      'com.adobe.cq.wcm.core.components.models.Text': '/text0001'
    },
    // note: you can use knobs to alter content data!
    content: {
      ':items': {
        text0001: {
          text: text('text', 'Hello, world.' ),
          isRichText: false,
        }
      }
    },
    template: MyText,
    noDecoration: true
  };
};
