import prompts from 'prompts';
import path from 'path';
import { titleCase } from 'title-case';
import { ARGS_USE_DEFAULTS } from '../../../consts';

export default async (args, config, absoluteRootPath) => {
  const defaultName = path.basename(absoluteRootPath);
  const defaultPackageName = `${titleCase(defaultName)} Design System`;
  const defaultLocalPackagePath = '.stories/aem-library';
  let packageProps: any = {};

  if (config.createAEMContent) {
    const { createAEMPackage } = await prompts({
      type: 'toggle',
      name: 'createAEMPackage',
      message: 'Do you wish to create an AEM content package for your stories? You will need to create this in AEM manually.',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    });

    if (createAEMPackage) {
      if (args.includes(ARGS_USE_DEFAULTS)) {
        packageProps = {
          packageGroup: defaultName,
          packageName: defaultPackageName,
          localPackagePath: defaultLocalPackagePath,
        };
      } else {
        packageProps = await prompts([
          {
            type: 'text',
            name: 'packageGroup',
            message: 'Enter the name of the package group',
            initial: defaultName,
            format: val => val || defaultName,
          },
          {
            type: 'text',
            name: 'packageName',
            message: 'Enter the .zip file name of the content package',
            initial: defaultPackageName,
            format: val => val || defaultPackageName,
          },
          {
            type: 'text',
            name: 'localPackagePath',
            message:
              'Enter the local path within the code base to where you want to store the AEM content package',
            initial: defaultLocalPackagePath,
            format: val => val || defaultLocalPackagePath,
          },
        ]);
      }
    }
  }

  return { ...config, ...packageProps };
};
