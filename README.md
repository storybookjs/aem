<p align="center">
  <a href="https://storybook.js.org/">
    <img src="./.github/sb-aem-logo.svg" alt="Storybook AEM App Logo" width="400" height="200">
  </a>
</p>
<h1 align="center">Storybook Adobe Experience Manager (AEM) App</h1>

This project has been created to provide native Storybook support for Adobe Experience Manager. It is a work in progress and has not been published yet. If you are interested in helping out or learning more about this project, you can join the discord channel [here](https://discord.gg/z5pGCKQ) to see what we've been up to.

To build and test out this project complete the following:

1. This project is built with yarn workspaces so you will need to install yarn
2. From the root directory, run "yarn"
3. From the root directory, run "yarn build"
4. Change directories to examples/aem-kitchen-sink
5. From the examples/aem-kitchen-sink directory, run "yarn storybook"

## Testing

Storybook AEM uses Jest for unit testing. To run unit tests use the following commands:

- Running all tests:
  - `yarn test`
- Run with watch mode enabled:
  - `yarn test:watch`
- Run tests and generate a coverage report:
  - `yarn test:coverage`

## Usage

See [example](./examples/aem-kitchen-sink/components/list/list.stories.js):

### Story configuration

As a part of the storybook configuration setup there are options you can use to customize your use case:

- Template (required): HTL/HTML File Reference or Inline HTML
- Content (optional): Mocked authored content that can be used in conjunction with knobs
- AEM Metadata: An assortment of metadata used to provide your component context such as:
  - Component dependencies: for nested components, you only need to provide a template but you must include require all nested component's xml files in order for them to render (They can also be defined at the story config level or in the preview using the aemMetadata decorator)
  - Decoration tags: tags/ classes that can be applied to the outside of your component as a wrapper and can be used to mock the java tag annotations({} or null)
  - Models (required): Used to render a component and can either be a proper use-class, a content object (model.json) or a resource path (string). When using the later, the respective content needs to be provided with the `content` object.

```
import Example from ('./example.html'); // HTL File or HTML File
export const Example = () => {
  return {
    template: MyText,
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
      models: {
        'com.adobe.cq.wcm.core.components.models.Text': GenericModel
      },
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
    require('../core/wcm/components/person/.content.xml'),
  ],
  decorationTag: {
    cssClasses: ['text','component'],
    tagName: 'article'
  },
  models: {
    'com.adobe.cq.wcm.core.components.models.Text': GenericModel
    'person': require('../models/person'),
  },
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

##### 1. GenericModel

Storybook provides a `GenericModel` that you can register as model. The `GenericModel` uses the underlying content and a heuristic to automatically export the properties.

The models needs to be registered in the story:

```js
  import { GenericModel } from '@storybook/aem';

  models: {
    'com.adobe.cq.wcm.core.components.models.Text': GenericModel
  }
```

#### 2. Javascript use classes

A more sophisticated way is to actually implement a use-class in javascript that can generate some of the dynamic, computed properties, similar to your java class. After the class is loaded, it is instantiated with the runtime global object passed as argument to the constructor.

A very simple example can be found here: [com.adobe.cq.wcm.core.components.models.Text](./examples/aem-kitchen-sink/models/com.adobe.cq.wcm.core.components.models.Text.js)

The models needs to be registered in the story or in the preview using the aemMetadata Decorator:

For example:

```js
    models: {
      'com.adobe.cq.wcm.core.components.models.Text': require('../../../../models/com.adobe.cq.wcm.core.components.models.Text'),
      'com.adobe.cq.wcm.core.components.models.Title': require('../../../../models/com.adobe.cq.wcm.core.components.models.Title')
    }
```

**Note**: In the future, there might be functionality to register multiple use-classes automatically.

##### 3. Extending the GenericModel

In case the `GenericModel` doesn't satisfy all the needs for rapid prototyping, it can easily be extended. For example to provide some computed or more complex content that will eventually by provided by a java class in AEM.

For Example:

**person.js**

```js
export default class Person extends GenericModel {
  get fullName() {
    return `${this.content.firstName} ${this.content.lastName}`;
  }
}
```

**person.stories.js**

```js
    models: {
      'person': require('../models/person')
    },
```

**person.html**

```htl
<div data-sly-use.personModel="person">
    <dl>
        <dt>First Name:</dt><dd>${personModel.firstName}</dd>
        <dt>Last Name:</dt><dd>${personModel.lastName}</dd>
        <dt>Full Name:</dt><dd>${personModel.fullName}</dd>
    </dl>
</div>
```

### Interested in helping out?

Check out our issues here: https://github.com/storybookjs/aem/issues
