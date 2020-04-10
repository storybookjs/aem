import prompts from 'prompts';

export default async (args, config, absoluteRootPath) => {
  const packageProps: any = {};

  if (config.createAEMContent) {
    const { createAEMPackage } = await prompts({
      type: 'toggle',
      name: 'createAEMPackage',
      message: `Do you wish to create an AEM content package for your stories?`,
      initial: true,
      active: 'Yes',
      inactive: 'No',
    });

    if (createAEMPackage) {
      packageProps.packageGroup = '<please fill in this config>';
      packageProps.packageName = '<please fill in this config>';
      packageProps.aemContentPath = '<please fill in this config>';
    }
  }

  return { ...config, ...packageProps };
};
