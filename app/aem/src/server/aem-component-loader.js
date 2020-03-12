const path = require('path');
const parser = require('xml2json');
const txtLoader = require.resolve('./aem-clientlib-txt-loader.js');
const JCR_ROOT_KEY = 'jcr:root';
const JCR_TITLE_KEY = 'jcr:title';

const getRequiredHTL = (component, context, pathBaseName) => {
  return `
   var component = ${JSON.stringify(component)};
   component.module = require('${context}/${pathBaseName}.html');
   module.exports = component;`;
}

const getRequiredClientLibs = (componentDir) => {
  // Generate the code to load and watch all
  // js.txt or css.txt files
  const loadClientLibCode = !componentDir
    ? ''
    : `
    var txtFileLoadContext = require.context(
      '!!${txtLoader}!${componentDir}/', 
      /* include subdirectories: */ 
      true, 
      /* all js.txt and css.txt files */
      /(^|\\\/)(js|css)\.txt$/
    );
    // Execute all files
    txtFileLoadContext.keys().forEach(txtFileLoadContext);
  `;
  return loadClientLibCode;
}

module.exports = async function(source) {
  const resourceType = this.context.substring(this.rootContext.length + 1);
  const json = JSON.parse(parser.toJson(source));
  const pathBaseName = path.basename(this.context);
  
  const component = {
    resourceType,
    properties: {
      [JCR_TITLE_KEY]: `${json[JCR_ROOT_KEY] ? json[JCR_ROOT_KEY][JCR_TITLE_KEY] : pathBaseName}`,
    }
  };
  
  return [getRequiredClientLibs(this.context), getRequiredHTL(component, this.context, pathBaseName)].join('\n');
};
