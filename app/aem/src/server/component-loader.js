const path = require('path');
const parser = require('xml2json');

module.exports = async function(source) {
  const resourceType = this.context.substring(this.rootContext.length + 1);
  const json = JSON.parse(parser.toJson(source));
  const name = path.basename(this.context);
  const component = {
    resourceType,
    properties: {
      'jcr:title': `${json['jcr:root'] ? json['jcr:root']['jcr:title'] : name}`,
    }
  };

  const code = [
    `const component = ${JSON.stringify(component)};`,
    `component.module = require('${this.context}/${name}.html');`,
    `module.exports = component`,
  ];
  return code.join('\n');
};
