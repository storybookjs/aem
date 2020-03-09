// eslint-disable-next-line import/no-extraneous-dependencies
import * as path from 'path';
import { Configuration } from 'webpack';

const modGen = (baseDir, varName, id) => {
  // todo: only proxy the models atually defined as models.
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
                runtimeVars: ['wcmmode', 'component'],
              }
            },
          ],
        },
        {
          test: /\.content\.xml$/,
          use: [
            {
              loader: path.resolve(__dirname, './aem-component-loader.js'),
            }
          ]
        },
      ],
    },
  };
}
