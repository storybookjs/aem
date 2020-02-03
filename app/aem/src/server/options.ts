// tslint:disable-next-line: no-var-requires
const packageJson = require('../../package.json');

export default {
  packageJson,
  framework: 'aem',
  frameworkPresets: [require.resolve('./framework-preset-aem.js')],
};
