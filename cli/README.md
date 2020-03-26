# Storybook AEM CLI

Storybook AEM CLI is a command line application that is used with [@storybook/aem](https://www.npmjs.com/package/@storybook/aem). It provides useful commands that will speed up your workflow.

## Installation
To install the Storybook AEM CLI run `npm install @storybook/aem-cli -g` from the directory with your `package.json` file. Also add it to your project as a development dependency.

## Commands
There are several commands provided by the Storybook AEM CLI. You can find a list of them by running `sb-aem` from your terminal. Or by running the `sb-aem help` command. Ensure you are running the `sb-aem` commands from the folder with your `package.json` file.

```
Usage: sb-aem <command> <options>

Commands:
  init .................. Start a new project, or add to existing project
  story ................. Creates/Updates your component story file, Adds story definition, Creates AEM Content example
  package ............... Imports & Exports content package from AEM => Code => AEM
  help .................. Show help menu for sb-aem
  version, v ............ Show sb-aem version
```

### Init
TKTKTK More description and refactoring of the `init` command is to come.

### Story
The `sb-aem story` command is the most used command provided. Running this command will provide you with a series of prompts to get started adding stories. It will ask for which component and type of component you want to make stories. From there it will create the story definition, and if desired, will also create content in AEM for your story.

### Package
The `sb-aem package` command comes with two subcommands - `install` and `export`. When configured, you can use these commands to manage the content for your stories in AEM. If you add an additional step to your maven build, you can also install the content package automatically.

The `sb-aem package install` command will POST the content package zip file into AEM and replicate it for use in AEM. By default, the install command will also open your default browser to the package content that was just installed. You can pass the `--quiet` option to prevent this.

The `sb-aem package export` command will rebuild the content package specified, and then download it to the configured location in your codebase.

#### Package and Maven
TODO: ADD EXAMPLE TO EXAMPLES REPO
See the [example.pom.xml](https://github.com/icfnext/storybook-aem/tree/master/packages/storybook-aem/example.pom.xml) file to see how you can add a maven build profile to take advantage of the `sb-aem package` command. The example adds support for a new maven profile `install-storybook` that can be used like so: `mvn clean install -P install-storybook`. Additionally, this [example.pom.xml](https://github.com/icfnext/storybook-aem/tree/master/packages/storybook-aem/example.pom.xml) expects two scripts in the package.json file:

```
{
  "scripts": {
    "storybook-library:install-maven": "sb-aem package install --quiet",
    "storybook-library:export": "sb-aem package export",
  }
}
```

### Version
The `sb-aem version` command shows the installed version of `sb-aem` you are using. On every command ran, there is a check if the latest version of `sb-aem` is installed.

### Help
The `sb-aem help <subcommand>` command will show the help documentation for `sb-aem` or the specified subcommand.
