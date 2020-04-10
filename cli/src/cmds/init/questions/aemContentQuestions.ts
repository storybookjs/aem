import prompts from 'prompts';

export default async (args, config, absoluteRootPath) => {
  let aemContentAnswers = await prompts({
    type: 'toggle',
    name: 'createAEMContent',
    message: `Do you wish to create content in AEM for your stories?`,
    initial: true,
    active: 'Yes',
    inactive: 'No',
  });

  if (aemContentAnswers.createAEMContent) {
    aemContentAnswers = {
      ...aemContentAnswers,
      ...(await prompts([
        {
          type: 'text',
          name: 'aemContentDefaultPageResourceType',
          message:
            'Please enter the resource type of the page component to use to create AEM pages for your stories.\n  You can leave this blank and update the package.json file later.',
        },
        {
          type: 'text',
          name: 'aemContentDefaultPageTemplate',
          message:
            'Please enter the full path to the page template that you want to use to create AEM pages for your stories.\n  You can leave this blank and update the package.json file later.',
        },
        {
          type: 'text',
          name: 'aemContentDefaultPageContentPath',
          message:
            'Please enter the sub path under the page where the components should go. This is the path relative to the "jcr:root" node.\n  You can leave this blank and update the package.json file later.',
        },
        {
          type: 'text',
          name: 'aemStoryHeadingComponentResourceType',
          message:
            'Please enter the resource type of the story heading component to use to separate the stories. This is so that the stories in the AEM page are clearly separated.\n  You can leave this blank and update the package.json file later.',
        },
        {
          type: 'text',
          name: 'aemStoryHeadingComponentTitleProperty',
          message:
            'Please enter the title property of the story heading component. This will default to "jcr:title" if nothing is entered.',
          format: val => val || 'jcr:title',
        },
      ])),
    };
  }

  return { ...config, ...aemContentAnswers };
};
