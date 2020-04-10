import prompts from 'prompts';

export default async (args, config, absoluteRootPath) => {
  const aemContentAnswers = await prompts({
    type: 'toggle',
    name: 'createAEMContent',
    message: `Do you wish to create content in AEM for your stories?`,
    initial: true,
    active: 'Yes',
    inactive: 'No',
  });

  if (aemContentAnswers.createAEMContent) {
    aemContentAnswers.aemContentDefaultPageResourceType = '<please fill in this config>';
    aemContentAnswers.aemContentDefaultPageTemplate = '<please fill in this config>';
    aemContentAnswers.aemContentDefaultPageContentPath = '<please fill in this config>';
    aemContentAnswers.aemStoryHeadingComponentResourceType = '<please fill in this config>';
    aemContentAnswers.aemStoryHeadingComponentTitleProperty = '<please fill in this config>';
  }

  return { ...config, ...aemContentAnswers };
};
