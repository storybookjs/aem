"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// tslint:disable-next-line: no-var-requires
const packageJson = require('../../package.json');

var _default = {
  packageJson,
  framework: 'html',
  frameworkPresets: [require.resolve('./framework-preset-html.js')]
};
exports.default = _default;