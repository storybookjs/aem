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

'use strict';

const loaderUtils = require('loader-utils');
const { Compiler } = require('@adobe/htlengine');

async function run(content) {
}

module.exports = async function compile(content) {
  // const options = loaderUtils.getOptions(this);

  const modGen = (baseDir, varName, id) => {
    if (id.startsWith('com.adobe.cq.wcm.core.components.models')) {
      return `const ${varName} = require('../../poc/GenericModel')(${JSON.stringify(id)});`;
    }
  };

  // setup the HTL compiler
  const compiler = new Compiler()
    .withDirectory(this.rootContext)
    .includeRuntime(false)
    .withRuntimeGlobalName('context')
    .withRuntimeVar('wcmmode')
    .withRuntimeVar('component')
    .withModuleImportGenerator(modGen);

  // compile the script to a executable template function
  const template = await compiler.compileToString(content, this.context);

  // console.log(template);

  return template;
};
