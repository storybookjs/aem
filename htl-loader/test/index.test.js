/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

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
