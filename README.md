# Storybook Adobe Experience Manager (AEM) App

This project has been created to provide native Storybook support for Adobe Experience Manager. It is a work in progress and has not been published yet. If you are interested in helping out or learning more about this project, you can join the discord channel [here](https://discord.gg/z5pGCKQ) to see what we've been up to.

To build and test out this project complete the following:

1) This project is built with yarn workspaces so you will need to install yarn
2) From the root directory, run "yarn"
3) From the root directory, run "yarn build"
4) Change directories to examples/aem-kitchen-sink
5) From the examples/aem-kitchen-sink directory, run "yarn storybook"

## Usage
See [example](./examples/aem-kitchen-sink/core/wcm/components/text/text.stories.js):

### Story configuration
As a part of the storybook configuration setup there are options you can use to customize your use case:
- Template (required): HTL/HTML File Reference or Inline HTML
- Models (required): Used to render a component and can either be a proper use-class, a content object (model.json) or a resource path (string). When using the later, the respective content needs to be provided with the `content` object described below.
- Content (optional): Mocked authored content that can be used in conjunction with knobs
- AEM Metadata (optional): An assortment of metadata used to provide your component context such as:
  - Component dependencies: for nested components, you only need to provide a template but you must include require all nested component's xml files in order for them to render (They can also be defined at the story config level or in the preview using the aemMetadata decorator)
  - Decoration tags: tags/ classes that can be applied to the outside of your component as a wrapper and can be used to mock the java tag annotations({} or null)

```
import Example from ('./example.html'); // HTL File or HTML File
export const Example = () => {
  return {
    template: MyText,
    models: {
      'com.adobe.cq.wcm.core.components.models.Text': require('../../../../models/com.adobe.cq.wcm.core.components.models.Text'),
    },
    content: {
      text: text('text', 'Hello, world.' ),
      isRichText: boolean('isRichText', false),
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

### AEM metadata decorator
The aem metadata decorator allows for the application of properties such as the decoration tag and the component includes to all of the stories (depending on where its used - in the preview or in the story config). Use the following syntax to apply the decorator:


#### Using the decorator in the Preview.js file
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

#### Using the decorator in the story config file
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

### Use Classes / Sling Models

In AEM, most HTL scripts bind java classes in the `data-sly-use` attribute which makes the business logic available to the scripts. Most often, those classes implement _Sling Models_ which offer a simple annotation based way to define the resource properties that should be exported to the script. The _Sling Models_ are also used to generated the `*.model.json` view of a resource.

For Example: [Text](https://github.com/adobe/aem-core-wcm-components/blob/master/bundles/core/src/main/java/com/adobe/cq/wcm/core/components/models/Text.java)

With the htlengine used in JavaScript, it is not possible to use the java classes directly. Further, since loading of the model _modules_ is not trivial, they need to be registered in the story.

There are several ways to provide the required functionality to the javascript world.

#### 1. Plain Objects

The probably simplest way is to provide a plain object, where the keys correspond to the property names. The value can either be a primitive value, a javascript getter (eg: `get title() { }`) or a function (eg: `title: () => ()`)).

A easy way is to request the respective json resource with the `model` selector. eg:

```console
$ curl localhost:4502/content/en/welcome/jcr:content/par/0001.model.json
```

And then register the model in the story:

```js
    models: {
      'com.adobe.cq.wcm.core.components.models.Text': {
        text: 'Hello, world',
        isRichText: false
      }
    }
````
_Hint_: The `model.json` can also be imported with a `require()` statement.


**Caveat**: The same _model_ object is used with all instances of the respective model. So for example rendering a parsys, that includes several `Text` components, that use all the same _model_ object, will render the same output.

#### 2. Javascript use classes

A more sophisticated way is to actually implement a use-class in javascript that can generate some of the dynamic, computed properties, similar to your java class. After the class is loaded, it is instantiated with the runtime global object passed as argument to the constructor.

A very simple example can be found here: [com.adobe.cq.wcm.core.components.models.Text](./examples/aem-kitchen-sink/models/com.adobe.cq.wcm.core.components.models.Text.js)

The models needs to be registered in the story:

For example:

```js
    models: {
      'com.adobe.cq.wcm.core.components.models.Text': require('../../../../models/com.adobe.cq.wcm.core.components.models.Text'),
      'com.adobe.cq.wcm.core.components.models.Title': require('../../../../models/com.adobe.cq.wcm.core.components.models.Title')
    }
```

**Note**: In the future, there might be functionality to register multiple use-classes automatically.

#### 3. Providing a resource path to a content object

There might be cases where a larger content object (in form of a `*.model.json`) dump is provided. Then a story can just provide a resource path into the content and a model is implicitly mapped to
the respective resource. This is similar to (1).

For Example:

```js
    models: {
      'com.adobe.cq.wcm.core.components.models.Text': '/text0001'
    },
    content: {
      ':items': {
        text0001: {
          text: 'Hello, world',
          isRichText: false,
        }
      }
    }
```

**Note**: In the future, the content path would be derived from the current resource path, so that it will be very simple to render a complex component. It might even become the default (e.g. merge with (1) above.

### TODO

#### app

- make models and component loading automatic (during compile time)
  (see ComponentLoader and GenericModel)
- Auto-detect clientlib dependencies and categories

#### examples / models
- the real AEM core components have a lot of logic in their model classes.
  in order to display them properly, they need to be partially ported to JS.

#### htlengine

- better error reporting (add file, line, col): eg: `Error: Error: mismatched input 'in' expecting {'}', '@'}`
