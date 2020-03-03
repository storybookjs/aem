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

- better error reporting (add file, line, col): eg: `Error: Error: mismatched input 'in' expecting {'}', '@'}`

## Usage
See [example](./examples/aem-kitchen-sink/core/wcm/components/text/text.stories.js):
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
    // decorationTag - optional - {} or null
    // Wrapper Element for template
    // Null value prevents the template from being wrapped
    // decorationTag.cssClasses - optional - array - Array of classes that will be added to the Wrapper Element
    // decorationTag.tagname - optional - string - The type of Wrapper Element - e.g. div, section, etc
    decorationTag: {
      cssClass: ['text'],
      tagName: 'article'
    },
    // models used to render this component. the model can either be a proper use-class, 
    // a content object (model.json) or a resource path (string). When using the later,
    // the respective content needs to be provided with the `content` object above.
    models: {
      'com.adobe.cq.wcm.core.components.models.Text': require('../../../../models/com.adobe.cq.wcm.core.components.models.Text'),
    }
  };
};
```
