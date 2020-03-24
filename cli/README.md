# storybook-aem

Storybook-aem is a command line application - CLI - that is used with [@storybook/aem](https://www.npmjs.com/package/@storybook/aem). It provides useful commands that will speed up your workflow.

## Installation
To install `storybook-aem` run `npm install storybook-aem -g` from the directory with your `package.json` file. Also add it to your project as a development dependency.

## Commands
There are several commands provided by `storybook-aem`. You can find a list of them by running `storybook-aem` from your terminal. Or by running the `storybook-aem help` command. Ensure you are running the `storybook-aem` commands from the folder with your `package.json` file.

```
Usage: storybook-aem <command> <options>

Commands:
  init .................. Start a new project, or add to existing project
  story ................. Creates/Updates your component story file, Adds story definition, Creates AEM Content example
  package ............... Imports & Exports content package from AEM => Code => AEM
  help .................. Show help menu for storybook-aem
  version, v ............ Show storybook-aem version
```

### Init
TKTKTK More description and refactoring of the `init` command is to come.

### Story
The `storybook-aem story` command is the most used command provided. Running this command will provide you with a series of prompts to get started adding stories. It will ask for which component and type of component you want to make stories. From there it will create the story definition, and if desired, will also create content in AEM for your story.

### Package
The `storybook-aem package` command comes with two subcommands - `install` and `export`. When configured, you can use these commands to manage the content for your stories in AEM. If you add an additional step to your maven build, you can also install the content package automatically. 

The `storybook-aem package install` command will POST the content package zip file into AEM and replicate it for use in AEM. By default, the install command will also open your default browser to the package content that was just installed. You can pass the `--quiet` option to prevent this.

The `storybook-aem package export` command will rebuild the content package specified, and then download it to the configured location in your codebase.

#### Package and Maven 
See the [example.pom.xml](https://github.com/icfnext/storybook-aem/tree/master/packages/storybook-aem/example.pom.xml) file to see how you can add a maven build profile to take advantage of the `storybook-aem package` command. The example adds support for a new maven profile `install-storybook` that can be used like so: `mvn clean install -P install-storybook`. Additionally, this [example.pom.xml](https://github.com/icfnext/storybook-aem/tree/master/packages/storybook-aem/example.pom.xml) expects two scripts in the package.json file:

```
{
  "scripts": {
    "storybook-library:install-maven": "storybook-aem package install --quiet",
    "storybook-library:export": "storybook-aem package export",
  }
}
```

### Version
The `storybook-aem version` command shows the installed version of `storybook-aem` you are using. On every command ran, there is a check if the latest version of `storybook-aem` is installed.

### Help
The `storybook-aem help <subcommand>` command will show the help documentation for `storybook-aem` or the specified subcommand.
