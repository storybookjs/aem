'use strict';

const { Compiler } = require('@adobe/htlengine');

module.exports = async function compile(content) {
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
  return await compiler.compileToString(content, this.context);
};
