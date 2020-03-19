"use strict";
exports.__esModule = true;
// tslint:disable-next-line: no-var-requires
var packageJson = require('../../package.json');
exports["default"] = {
    packageJson: packageJson,
    framework: 'aem',
    frameworkPresets: [require.resolve('./framework-preset-aem.js')]
};
