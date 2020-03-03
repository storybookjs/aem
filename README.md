# Storybook Adobe Experience Manager (AEM) App

This project has been created to provide native Storybook support for Adobe Experience Manager. It is a work in progress and has not been published yet. If you are interested in helping out or learning more about this project, you can join the discord channel [here](https://discord.gg/z5pGCKQ) to see what we've been up to.

To build and test out this project complete the following:

1) This project is built with yarn workspaces so you will need to install yarn
2) From the root directory, run "yarn"
3) From the root directory, run "yarn build"
4) Change directories to examples/aem-kitchen-sink
5) From the examples/aem-kitchen-sink directory, run "yarn storybook"

# TODO

## app

- make models and component loading automatic (during compile time)
  (see ComponentLoader and GenericModel)
- inject clientlibs css and js.

## examples / models
- the real AEM core components have a lot of logic in their model classes.
  in order to display them properly, they need to be partially ported to JS.

## htlengine

- check spec for `in` operator. eg: `${item.name in accordion.expandedItems}`
- better error reporting (add file, line, col): eg: `Error: Error: mismatched input 'in' expecting {'}', '@'}`
- add support for function getters and java-like getters. e.g. `getText` for ${xyz.text}
- repeat variable not available in attributes of same element. eg:
  ```
   <div data-sly-repeat.item="${accordion.items}" data-cmp-expanded="${accordion.expandedItems[item.name] ? true : false}">
  ```

## Usage
See [example](https://github.com/storybookjs/aem/blob/master/examples/aem-kitchen-sink/components/text/text.stories.js):

#### Story configuration
```
import Example from ('./example.html'); // HTL File or HTML File
export const Example = () => {
  return {
    // content - optional 
    // JSON Content TKTK Needs description, can be combined with Knobs
    content: {
      text: text('text', 'Hello, world.' ),
      isRichText: boolean('isRichText', false),
    },
    // props - optional 
    // JSON Content TKTK Needs description
    props: {
      'jcr:title': 'Text (v2)'
    },
    // template - required
    // HTL/HTML File Reference or Inline HTML
    template: MyText, 
    aemMetadata: {
      // These are the component dependencies of the component you are testing
      // These component includes can also be defined at the story config level or in the preview using the aemMetadata decorator
      componentIncludes: [
        require('../core/wcm/components/accordion/.content.xml'),
        require('../core/wcm/components/list/.content.xml'),
        require('../core/wcm/components/text/.content.xml'),
      ],
      // decorationTag - optional - {} or null
      // Wrapper Element for template
      // Null value prevents the template from being wrapped
      // decorationTag.cssClasses - optional - array - Array of classes that will be added to the Wrapper Element
      // decorationTag.tagname - optional - string - The type of Wrapper Element - e.g. div, section, etc
      decorationTag: {
        cssClasses: ['text','component'],
        tagName: 'article'
      }
    }
  };
};
```

#### AEM metadata decorator
The aem metadata decorator allows for the application of properties such as the decoration tag and the component includes to all of the stories (depending on where its used - in the preview or in the story config). Use the following syntax to apply the decorator:

```
import { aemMetadata } from '@storybook/aem';

// in the preview.js
addDecorator(aemMetadata({
  componentIncludes: [
    require('../core/wcm/components/accordion/.content.xml'),
    require('../core/wcm/components/list/.content.xml'),
    require('../core/wcm/components/text/.content.xml'),
  ],
  decorationTag: {
    cssClasses: ['text','component'],
    tagName: 'article'
  }
}));

// in the story config
export default {
  title: 'Accordion',
  decorators: [
    aemMetadata({
      componentIncludes: [
        require('../core/wcm/components/accordion/.content.xml'),
        require('../core/wcm/components/list/.content.xml'),
        require('../core/wcm/components/text/.content.xml'),
      ],
      decorationTag: {
        cssClasses: ['text','component'],
        tagName: 'article'
      }
    }),
  ]
};
```