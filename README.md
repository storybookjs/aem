<p align="center">
  <a href="https://storybook.js.org/">
    <img src="./.github/sb-aem-logo.svg" alt="Storybook AEM App Logo" width="400" height="200">
  </a>
</p>
<h1 align="center">Storybook Adobe Experience Manager (AEM) App</h1>

## Table of Contents

* [About the Project](#about-the-project)
  * [Libraries](#libraries)
  * [Technologies](#technologies)
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Usage](#usage)
    * [Story Configuration](#story-configuration)
    * [AEM Metadata Decorator](#aem-metadata-decorator)
    * [Use Classes and Sling Models](#use-classes-and-sling-models)
* [Contributing](#contributing)

## About The project

This project has been created to provide native Storybook support for Adobe Experience Manager. It is a work in progress and has not been published yet. If you are interested in helping out or learning more about this project, <b>you can join the discord channel [here](https://discord.gg/z5pGCKQ)</b> to see what we've been up to.

### Libraries

* `@storybook/aem` - an application that provides Storybook support for Adobe Experience Manager(AEM)
* `@storybook/aem-cli` - a cli tool that helps build out your storybook stories and much more based on your AEM componentry and much more

### Technologies

* Storybook: https://storybook.js.org/
* Adobe HTL Engine: https://github.com/adobe/htlengine
* HTL Loader: https://github.com/backflip/htl-loader#readme
* TypeScript: https://www.typescriptlang.org/
* Webpack: https://webpack.js.org/
* Lerna: https://lerna.js.org/
* Jest: https://jestjs.io/
* Husky: https://github.com/typicode/husky
* ESLint: https://eslint.org/
* Prettier: https://prettier.io/

## Getting Started

### Installation

If your AEM project is using the suggested structure, you will want to first run `npm init` from your ui.apps directory. Running that command will create a package.json file that will allow you to include the necessary libraries.

To get started with your Storybook AEM instance, from the ui.apps directory, run `npm install @storybook/aem --save-dev` to pull down the proper Storybook library. If you would like further help setting up your Storybook configurations, you can install the Storybook AEM CLI Tool (optional) by running `npm install @storybook/aem-cli`. You can find more information about the cli tool [here](./cli/README.md).

### Usage

In the root directory of your ui.apps folder (or whereever youve chosen to include your package.json file, make sure to include a .storybook folder. You can follow this tutorial to help you set that up: https://www.learnstorybook.com/intro-to-storybook/react/en/get-started/. You can also see our example configuration [here](./examples/aem-kitchen-sink/.storybook).

When creating a new HTL component, we suggest that you create a storybook configuration within the same directory as your code so that you can easily associate which HTL component goes along with which storybook file. To see an example of a story for an HTL List Component click [here](./examples/aem-kitchen-sink/components/list/list.stories.js)!

Like any other Storybook Framework app, Storybook AEM supports both [CSF](https://storybook.js.org/docs/formats/component-story-format/) and [MDX](https://storybook.js.org/docs/formats/mdx-syntax/) formats.

#### Story Configuration

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

#### AEM Metadata Decorator

The aem metadata decorator allows for the application of properties such as the decoration tag and the component includes to all of the stories (depending on where its used - in the preview or in the story config). Use the following syntax to apply the decorator:

##### Using the Decorator in the Preview.js File

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

##### Using the Decorator in the Story Config File

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

#### Use Classes and Sling Models

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

##### 2. Javascript Use Classes

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

### Extending from other projects.

Extending from other projects is mostly straight forward, just import the components and models accordingly.
A 3rd party project might choose to deliberately export the list of components and models, so just import
their definition. see the `examples/aem-core-components` and how they imported in `examples/aem-kitchen-sink`. 

However, if the 3rd party projects use template references, the HTL compiler can't resolve them. So they need
to be specified during build time. This is currently only possible by using the `AEMRegisterJcrRoot` function.
See [aem-kitchen-sink/.storybook/main.js](./examples/aem-kitchen-sink/.storybook/main.js#L22).

The `AEMRegisterJcrRoot` function can also be used, if your project's content root is not the project directory.
See [aem-core-components/.storybook/main.js](./examples/aem-core-components/.storybook/main.js#L20).


### Contributing

For more information about how to start contributing to this project, see our [contributing file](./CONTRIBUTING.md).

Check out our issues here: https://github.com/storybookjs/aem/issues

Join our discord here: https://discord.gg/z5pGCKQ

We especially need help with figuring out the proper way to support 3rd party libraries that are defined in the POM and use Java models such as the AEM Core components. If you have any ideas about how to solve this please comment on this issue: https://github.com/storybookjs/aem/issues/45
