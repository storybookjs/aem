import * as path from 'path';
import { Configuration } from 'webpack';
import runtimeVariables from '../client/preview/helpers/runtime-variables';

const modGen = (baseDir, varName, id) => {
  // todo: only proxy the models that are actually defined as models.
  return `const ${varName} = require('@storybook/aem').modelProxy(${JSON.stringify(id)});`;
};

export function webpack(config: Configuration) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.html$/,
          use: [
            {
              loader: require.resolve('htl-loader'),
              options: {
                moduleImportGenerator: modGen,
                includeRuntime: false,
                globalName: 'context',
                runtimeVars: Object.keys(runtimeVariables()),
              },
            },
          ],
        },
        {
          test: /\.content\.xml$/,
          use: [
            {
              loader: path.resolve(__dirname, './aem-component-loader.js'),
            },
          ],
        },
      ],
    },
  };
}
