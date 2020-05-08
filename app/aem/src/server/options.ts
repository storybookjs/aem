// tslint:disable-next-line: no-var-requires
const packageJson = require('../../package.json');

/**
 * The following code exposes the global AEMRegisterJcrRoot function in order for components
 * to be able to register their project roots.
 */
const jcrRoots = [];

// todo: add current project's CWD as project root !?!

global['AEMRegisterJcrRoot'] = (root) => {
  if (Array.isArray(root)) {
    jcrRoots.push(...root);
  } else {
    jcrRoots.push(root);
  }
};

export default {
  packageJson,
  framework: 'aem',
  frameworkPresets: [require.resolve('./framework-preset-aem.js')],
  jcrRoots,
};
