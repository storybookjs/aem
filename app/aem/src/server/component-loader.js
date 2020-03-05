const path = require('path');

module.exports = async function(source) {
  const resourceType = this.context.substring(this.rootContext.length + 1);
  const name = path.basename(this.context);
  const component = {
    // todo: parse XML from `source`
    resourceType,
    properties: {
      'jcr:title': `${name}`,
    }
  };
  const code = [
    `const component = ${JSON.stringify(component)};`,
    `component.module = require('${this.context}/${name}.html');`,
    `module.exports = component`,
  ];
  return code.join('\n');
};
