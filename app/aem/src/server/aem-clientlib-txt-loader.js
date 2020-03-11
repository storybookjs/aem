const path = require('path');
const BASE_VARIABLE = '#base';
const EQUAL_DELIMETER = "=";

module.exports = async function(source) {
    const basePath;
    const requireStatements = [];
    const dependencyArray = source.split('\n');
    
    if(dependencyArray) {
      const cleanedBase = dependencyArray[0].replace(' ', '').trim();
      if(cleanedBase.indexOf(BASE_VARIABLE === 0)) {
        basePath = cleanedBase.split(EQUAL_DELIMETER)[1];
      }
      dependencyArray.forEach((dep, i) => {
        if(dep.trim().length > 0) {
          if(basePath) {
            if(i > 0) {
              requireStatements.push(`require('${path.resolve(`${this.context}/${basePath}/${dep}`)}')`)
            }
          } else {
            requireStatements.push(`require('${path.resolve(`${this.context}/${dep}`)}')`)
          }
        }
      });
    }
    return requireStatements.join('\n');
};
