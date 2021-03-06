# Storybook AEM CLI

Storybook AEM CLI is a command line application that is used with [@storybook/aem](https://www.npmjs.com/package/@storybook/aem). It provides useful commands that will speed up your workflow.

## Installation
To install the Storybook AEM CLI run `npm install @storybook/aem-cli -g` from the directory with your `package.json` file. Also add it to your project as a development dependency.

## Commands
There are several commands provided by the Storybook AEM CLI. You can find a list of them by running `sba` from your terminal. Or by running the `sba help` command. Ensure you are running the `sba` commands from the folder with your `package.json` file.

```
Usage: sba <command> <options>

Commands:
  story ................. Creates/Updates your component story file, Adds story definition, Creates AEM Content example
  package ............... Imports & Exports content package from AEM => Code => AEM
  help .................. Show help menu for sba
  version, v ............ Show sba version
```

### Story

#### Required configurations

```
{
  ...
  "@storybook/aem-cli": {
    "storybookLocation": "{String} The path to the '.storybook' directory.",
    "storybookStoryLocation": "{String:Optional} The path to the stories directory. If this does not exist then the stories will be created side by side with the components.",
    "appsPath": "{String} the path to the 'apps' directory under your ui.apps module.",
    "componentPaths": "{Array|String} The paths to the component directories",
    "storybookAEMStyleSystem": "{Boolean} Whether or not you want to use the StyleSystem plugin.",
    "storybookAEMGrid": "{Boolean} Whether or not to use the AEM grid plugin.",
    "storybookAEMPageTemplate": "{Boolean} Whether or not to use the page template plugin.",
    "storybookAEMConfluence": "{Boolean} Whether or not to use the Confluence plugin.",
    "storybookAEMFoundation": "{Boolean} Whether or not to use the foundation plugin.",
    "aemContentDefaultPageResourceType": "{String} The resource type of the page to use for creating stories",
    "aemContentDefaultPageTemplate": "{String} The conf path to the page template within AEM.",
    "aemContentDefaultPageContentPath": "{String} The page content path under the jcr:root node to create the components. This should be based on the resource type of the page.",
    "aemStoryHeadingComponentResourceType": "{String} The resource type of the component to use as a story heading to separate the content of different stories.",
    "aemStoryHeadingComponentTitleProperty": "{String} The node name of the title property of the heading component.",
    "storyRoot": "{String} The name of the story group in AEM.",
    "aemContentPath": "{String} The AEM content path where the pages in AEM will be created.",
    "createAEMContent": "{Boolean} Whether or not the story command should create content in AEM."
  }
}
```

The `sba story` command is the most used command provided. Running this command will provide you with a series of prompts to get started adding stories. It will ask for which component and type of component you want to make stories. From there it will create the story definition, and if desired, will also create content in AEM for your story.

The `sba story create` command will follow the same prompts as `sba story` but it will assume that you want to create a single story.

The `sba story create all` command will follow the same prompts as `sba story` but it will assume that you want to create all the stories of the selected directory.

### Package
The `sba package` command comes with two subcommands - `install` and `export`. When configured, you can use these commands to manage the content for your stories in AEM. If you add an additional step to your maven build, you can also install the content package automatically.

To set this up you first need to create a package in the [AEM package manager](http://localhost:4502/crx/packmgr/index.jsp) that is configured with filters that include the content needed for your stories. Then you will need to configure and run the `sba package export` command as explained below. After this you should add any .content.xml files that are unnecessary to your .gitignore to avoid unnecessary content from being saved to the code base and to avoid merge conflicts.

#### Package Export

The `sba package export` command will rebuild the specified content package and then download the contents to the configured location in your codebase. The zip file will not be be retained, instead the `jcr_root` and `META-INF` will be saved to the codebase. This should allow for both manual changes and easy version control of the content.

This command requires that a `localPackagePath` configuration be added to the `sba` section of your `package.json` file. This configuration should point to the directory within the codebase that you want to save the package to. This directory should not contain anything other than the `jcr_root`, and `META-INF` directories of the package, as created by the `export` command. It is suggested to point this configuration at a `.storybook/aem-library` directory, which will need manually created.

#### Package Install

The `sba package install` command will create an AEM package from the `localPackagePath` directory as explained in the previous section. It will POST this content package zip file into AEM and replicate it for use in AEM. By default, the install command will also open your default browser to the package content that was just installed. You can pass the `--quiet` option to prevent this.

This command required that a `aemContentPath` configuration be added to the `sba` section of your `package.json` file. This is the path that will be opened with the Site Editor in AEM after the package is installed.

#### Package and Maven
TODO: ADD EXAMPLE TO EXAMPLES REPO
See the [example.pom.xml](https://github.com/icfnext/storybook-aem/tree/master/packages/storybook-aem/example.pom.xml) file to see how you can add a maven build profile to take advantage of the `sba package` command. The example adds support for a new maven profile `install-storybook` that can be used like so: `mvn clean install -P install-storybook`. Additionally, this [example.pom.xml](https://github.com/icfnext/storybook-aem/tree/master/packages/storybook-aem/example.pom.xml) expects two scripts in the package.json file:

```
{
  "scripts": {
    "storybook-library:install-maven": "sba package install --quiet",
    "storybook-library:export": "sba package export",
  }
}
```

### Version
The `sba version` command shows the installed version of `sba` you are using. On every command ran, there is a check if the latest version of `sba` is installed.

### Help
The `sba help <subcommand>` command will show the help documentation for `sba` or the specified subcommand.
