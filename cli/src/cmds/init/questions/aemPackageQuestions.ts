import prompts from 'prompts';

export default async (args, config, absoluteRootPath) => {
  let packageProps: any = {};

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
      packageProps = await prompts([
        {
          type: 'text',
          name: 'packageGroup',
          message: 'Please enter the name of the package group',
        },
        {
          type: 'text',
          name: 'packageName',
          message: 'Please enter the .zip file name of the content package',
        },
        {
          type: 'text',
          name: 'aemContentPath',
          message:
            'Please enter the local path within the code base to where you want to store the AEM content package. This will default to ".stories/library"',
          format: val => val || '.stories/aem-library',
        },
      ]);
    }
  }

  return { ...config, ...packageProps };
};
