import prompts from 'prompts';
import path from 'path';

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
          name: 'aemContentPath',
          message: 'Enter the AEM content path that you want the design system at',
          initial: `/content/${path.basename(absoluteRootPath)}-design-system`,
          format: val => val || `/content/${path.basename(absoluteRootPath)}-design-system`,
        },
        {
          type: 'text',
          name: 'aemContentDefaultPageResourceType',
          message: 'Enter the resource type of the page component',
        },
        {
          type: 'text',
          name: 'aemContentDefaultPageTemplate',
          message: 'Enter the full AEM path of the page template',
        },
        {
          type: 'text',
          name: 'aemContentDefaultPageContentPath',
          message: 'Enter the path to the parsys relative to the pages jcr:root node',
        },
        {
          type: 'text',
          name: 'aemStoryHeadingComponentResourceType',
          message: 'Enter the resource type of the story heading component',
        },
        {
          type: 'text',
          name: 'aemStoryHeadingComponentTitleProperty',
          message: 'Enter the title property of the story heading component',
          initial: 'jcr:title',
          format: val => val || 'jcr:title',
        },
      ])),
    };
  }

  return { ...config, ...aemContentAnswers };
};
