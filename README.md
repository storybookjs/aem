# Storybook Adobe Experience Manager (AEM) App

This project has been created to provide native Storybook support for Adobe Experience Manager. It is a work in progress and has not been published yet. If you are interested in helping out or learning more about this project, you can join the discord channel [here](https://discord.gg/z5pGCKQ) to see what we've been up to.

To build and test out this project complete the following:

1) This project is built with yarn workspaces so you will need to install yarn
2) From the root directory, run "yarn"
3) From the root directory, run "yarn build"
4) Change directories to examples/aem-kitchen-sink
5) From the examples/aem-kitchen-sink directory, run "yarn storybook"

## Usage
See [example](https://github.com/storybookjs/aem/blob/master/examples/aem-kitchen-sink/components/text/text.stories.js):

#### Story configuration
As a part of the storybook configuration setup there are options you can use to customize your use case:
- Template (required): HTL/HTML File Reference or Inline HTML
- Content (optional): Mocked authored content that can be used in conjunction with knobs
- Props (optional): Mocked JCR props that can be used in conjunction with knobs
- AEM Metadata (optional): An assortment of metadata used to provide your component context such as:
  - Component dependencies: for nested components, you only need to provide a template but you must include require all nested component's xml files in order for them to render (They can also be defined at the story config level or in the preview using the aemMetadata decorator)
  - Decoration tags: tags/ classes that can be applied to the outside of your component as a wrapper and can be used to mock the java tag annotations({} or null)

```
import Example from ('./example.html'); // HTL File or HTML File
export const Example = () => {
  return {
    template: MyText,
    content: {
      text: text('text', 'Hello, world.' ),
      isRichText: boolean('isRichText', false),
    },
    props: {
      'jcr:title': 'Text (v2)'
    },
    aemMetadata: {
      components: [
        require('../core/wcm/components/accordion/.content.xml'),
        require('../core/wcm/components/list/.content.xml'),
        require('../core/wcm/components/text/.content.xml'),
      ],
      decorationTag: {
        cssClasses: ['text','component'],
        tagName: 'article' // type of wrapper element
      }
    }
  };
};
```

#### AEM metadata decorator
The aem metadata decorator allows for the application of properties such as the decoration tag and the component includes to all of the stories (depending on where its used - in the preview or in the story config). Use the following syntax to apply the decorator:


##### Using the decorator in the Preview.js file
```
import { aemMetadata } from '@storybook/aem';

addDecorator(aemMetadata({
  components: [
    require('../core/wcm/components/accordion/.content.xml'),
    require('../core/wcm/components/list/.content.xml'),
    require('../core/wcm/components/text/.content.xml'),
  ],
  decorationTag: {
    cssClasses: ['text','component'],
    tagName: 'article'
  }
}));
```

##### Using the decorator in the story config file
```
export default {
  title: 'Accordion',
  decorators: [
    aemMetadata({
      components: [
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

#### Including Styles and JS from client libs
In order to provide a component with its styles, you must reuire the dependencies inside the story config.
Example:
```
require('./clientlibs/site/css/accordion.css');
require('./clientlibs/site/js/accordion.js');
```
* We are working on a solution using webpack to automatically pick up on your clientlib changes

#### TODO

##### app

- make models and component loading automatic (during compile time)
  (see ComponentLoader and GenericModel)
- inject clientlibs css and js. using webpack

##### examples / models
- the real AEM core components have a lot of logic in their model classes.
  in order to display them properly, they need to be partially ported to JS.

##### htlengine

- check spec for `in` operator. eg: `${item.name in accordion.expandedItems}`
- better error reporting (add file, line, col): eg: `Error: Error: mismatched input 'in' expecting {'}', '@'}`
- add support for function getters and java-like getters. e.g. `getText` for ${xyz.text}
- repeat variable not available in attributes of same element. eg:
  ```
   <div data-sly-repeat.item="${accordion.items}" data-cmp-expanded="${accordion.expandedItems[item.name] ? true : false}">
  ```