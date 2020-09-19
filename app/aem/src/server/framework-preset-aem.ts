import * as path from 'path';
import { Configuration } from 'webpack';
import runtimeVariables from '../client/preview/helpers/runtime-variables';
import { createScriptResolver } from '@adobe/htlengine';
import options from './options';

const modGen = (baseDir, varName, id) => {
  // todo: only proxy the models that are actually defined as models.
  return `const ${varName} = require('@storybook/aem').modelProxy(${JSON.stringify(id)});`;
};

export function webpack(config: Configuration) {
  const scriptResolver = createScriptResolver(options.jcrRoots);

  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(html|htl)$/,
          use: [
            {
              loader: require.resolve('htl-loader'),
              options: {
                moduleImportGenerator: modGen,
                includeRuntime: false,
                globalName: 'context',
                runtimeVars: Object.keys(runtimeVariables()),
                scriptResolver,
              },
            },
          ],
        },
        {
          test: /\.content\.xml$/,
          use: [
            {
              loader: path.resolve(__dirname, './aem-component-loader.js'),
              options: {
                resolver: scriptResolver,
              },
            },
          ],
        },
        {
          test: /\.less/,
          loaders: ['style-loader', 'css-loader', 'less-loader'],
        },
      ],
    },
  };
}
