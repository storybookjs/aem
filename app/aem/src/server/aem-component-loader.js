const path = require('path');
const glob = require('glob');
const parser = require('xml2json');
const JCR_ROOT_KEY = 'jcr:root';
const JCR_TITLE_KEY = 'jcr:title';

module.exports = async function(source) {
  const resourceType = this.context.substring(this.rootContext.length + 1);
  const json = JSON.parse(parser.toJson(source));
  const pathBaseName = path.basename(this.context);
  const code = []

  const component = {
    resourceType,
    properties: {
      JCR_TITLE_KEY: `${json[JCR_ROOT_KEY] ? json[JCR_ROOT_KEY][JCR_TITLE_KEY] : pathBaseName}`,
    }
  };

  code = code.concat(getRequiredClientLibs(this.context));
  code.push(getRequiredHTL(component, this.context, pathBaseName));
  return code.join('\n');
};

const getRequiredHTL = (component, context, pathBaseName) => {
  return `const component = ${JSON.stringify(component)};
   component.module = require('${context}/${pathBaseName}.html');
   module.exports = component;`;
}

const getRequiredClientLibs = (componentDir) => {
  const requireStatements = [];
  glob.sync(`${componentDir}/**/clientlibs/**/{css,less,js}/*`).forEach((file)=> {
    requireStatements.push(`require('${path.resolve(file)}')`)
  })
  return requireStatements;
}