/* eslint-env mocha */
const assert = require('assert');
const path = require('path');
const webpack = require('webpack');

function createBundle(testFile, bundleName) {
  return new Promise((resolve, reject) => {
    webpack({
      entry: path.resolve(__dirname, testFile),
      mode: 'development',
      target: 'node',
      // node: {
      //   global: false,
      //   __filename: 'mock',
      //   __dirname: 'mock',
      //   fs: 'mock',
      // },
      module: {
        rules: [{
          test: /\.htl$/,
          use: [
            {
              loader: require.resolve('../src/index.js'),
            },
          ],
        }],
      },
      output: {
        libraryTarget: 'commonjs2',
        path: `${__dirname}/generated`,
        filename: bundleName,
      },
    }, (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(stats.compilation.errors[0]);
      }
      if (stats.hasWarnings()) {
        // return reject(stats.compilation.warnings[0]);
      }
      // eslint-disable-next-line global-require,import/no-dynamic-require
      return resolve(require(`./generated/${bundleName}`));
    });
  });
}

describe('HTL Compilation', () => {
  it('simple htl file.', async () => {
    const bundle = await createBundle('./specs/simple.htl', 'simple.js');
    const output = await bundle.main({});
    assert.strictEqual(output, '<p>Hello, world.</p>\n');
  }).timeout(10000);
});
