// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from 'webpack';

const modGen = (baseDir, varName, id) => {
  if (id.startsWith('com.adobe.cq.wcm.core.components.models')) {
    return `const ${varName} = require('../../poc/GenericModel')(${JSON.stringify(id)});`;
  }
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
      ],
    },
  };
}
