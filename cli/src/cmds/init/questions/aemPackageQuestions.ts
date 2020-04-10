import prompts from 'prompts';
import path from 'path';
import { titleCase } from 'title-case';

export default async (args, config, absoluteRootPath) => {
  const defaultName = path.basename(absoluteRootPath);
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
          message: 'Enter the name of the package group',
          initial: `${defaultName}`,
          format: val => val || `${defaultName}`,
        },
        {
          type: 'text',
          name: 'packageName',
          message: 'Enter the .zip file name of the content package',
          initial: `${titleCase(defaultName)} Design System`,
          format: val => val || `${titleCase(defaultName)} Design System`,
        },
        {
          type: 'text',
          name: 'localPackagePath',
          message:
            'Enter the local path within the code base to where you want to store the AEM content package',
          initial: '.stories/aem-library',
          format: val => val || '.stories/aem-library',
        },
      ]);
    }
  }

  return { ...config, ...packageProps };
};
