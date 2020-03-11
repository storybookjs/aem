const path = require('path');
const glob = require('glob');
const fs = require('fs');
const parser = require('xml2json');
const JCR_ROOT_KEY = 'jcr:root';
const JCR_TITLE_KEY = 'jcr:title';

const getRequiredHTL = (component, context, pathBaseName) => {
  return `const component = ${JSON.stringify(component)};
   component.module = require('${context}/${pathBaseName}.html');
   module.exports = component;`;
}

const getRequiredClientLibs = (componentDir) => {
  const requireStatements = [];
  glob.sync(`${componentDir}/**/clientlibs/**/{css,js,less}.txt`).forEach((file)=> {
    const dependencyArray = fs.readFileSync(file, 'utf8').split('\n');
    if(dependencyArray) {
      const basePath = '';
      const cleanedBase = dependencyArray[0].replace(' ', '').trim();
      if(cleanedBase.indexOf('#base' === 0)) {
        basePath = cleanedBase.split("=")[1];
      }
      dependencyArray.forEach((dep, i) => {
        if(dep.trim().length > 0) {
          const parentDirectory = path.join(file, '..');
          if(basePath) {
            if(i > 0) {
              requireStatements.push(`require('${path.resolve(`${parentDirectory}/${basePath}/${dep}`)}')`)
            }
          } else {
            requireStatements.push(`require('${path.resolve(`${parentDirectory}/${dep}`)}')`)
          }
        }
      });
    }
  })
  return requireStatements;
}

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
