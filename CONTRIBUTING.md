# Contributors Guide

Welcome and thank you for your help in making the Storybook AEM project success!  We are a community-driven project and welcome submissions of all sorts such as reviews, documentation, bugfixes, features, and more.

## Building the project

1. This project is built with yarn workspaces so you will need to install yarn
2. From the root directory, run "yarn"
3. From the root directory, run "yarn build"
4. Change directories to examples/aem-kitchen-sink
5. From the examples/aem-kitchen-sink directory, run "yarn storybook"

## Testing the project

Storybook AEM uses Jest for unit testing. To run unit tests use the following commands:

- Running all tests:
  - `yarn test`
- Run with watch mode enabled:
  - `yarn test:watch`
- Run tests and generate a coverage report:
  - `yarn test:coverage`

## Precommit hooks

Whenever you make a new commit to a branch, your code will be run through the following `eslint` check to ensure that the quality of code is consistent across the repo.

## Want a new feature or are looking to have a bug resolved?
If you have found a bug or need a feature implemented make sure to create an issue here: https://github.com/storybookjs/aem/issues/new

If you plan to fix the issue or develop the feature, assign it to yourself.

## Contributing to documentation
Contributions to documentation are some of the most significant because they help our users understand how the code works and how to use the libraries. If you find the documentation vague, please make the required changes and send out a PR. We will definitely appreciate it!
