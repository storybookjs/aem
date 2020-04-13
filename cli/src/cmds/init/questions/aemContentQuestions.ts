import prompts from 'prompts';
import path from 'path';
import { resourceTypePrompt } from '../../../utils';

const cwd = process.cwd();

export default async (args, config, absoluteRootPath) => {
  const aemContentAnswers = await prompts({
    type: 'toggle',
    name: 'createAEMContent',
    message: 'Do you wish to create content in AEM for your stories?',
    initial: true,
    active: 'Yes',
    inactive: 'No',
  });

  if (aemContentAnswers.createAEMContent) {
    const appsPath = path.join(cwd, config.appsPath);
    const componentPath = path.join(cwd, config.componentPaths[0]);

    aemContentAnswers.aemContentPath = (
      await prompts({
        type: 'text',
        name: 'aemContentPath',
        message: 'Enter the AEM content path that you want the design system at',
        initial: `/content/${path.basename(absoluteRootPath)}-design-system`,
        format: val => val || `/content/${path.basename(absoluteRootPath)}-design-system`,
      })
    ).aemContentPath;

    aemContentAnswers.aemContentDefaultPageResourceType = await resourceTypePrompt(
      appsPath,
      'Navigate to the page type that you want to use'
    );
    aemContentAnswers.aemContentDefaultPageTemplate = await resourceTypePrompt(
      appsPath,
      'Navigate to the template that you want to use'
    );

    aemContentAnswers.aemContentDefaultPageContentPath = (
      await prompts({
        type: 'text',
        name: 'aemContentDefaultPageContentPath',
        message: 'Enter the path to the parsys relative to the pages jcr:root node',
      })
    ).aemContentDefaultPageContentPath;

    aemContentAnswers.aemStoryHeadingComponentResourceType = await resourceTypePrompt(
      componentPath,
      'Navigate to the heading component that you want to use'
    );

    aemContentAnswers.aemStoryHeadingComponentTitleProperty = (
      await prompts({
        type: 'text',
        name: 'aemStoryHeadingComponentTitleProperty',
        message: 'Enter the title property of the story heading component',
        initial: 'jcr:title',
        format: val => val || 'jcr:title',
      })
    ).aemStoryHeadingComponentTitleProperty;
  }

  return { ...config, ...aemContentAnswers };
};
