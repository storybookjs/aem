const path = require('path');
const parser = require('xml2json');
const JCR_ROOT_KEY = 'jcr:root';
const JCR_TITLE_KEY = 'jcr:title';

module.exports = async function(source) {
  const resourceType = this.context.substring(this.rootContext.length + 1);
  const json = JSON.parse(parser.toJson(source));
  const name = json[JCR_ROOT_KEY] ? json[JCR_ROOT_KEY][JCR_TITLE_KEY] : path.basename(this.context);
  const component = {
    resourceType,
    properties: {
      JCR_TITLE_KEY: `${name}`,
    }
  };

  const code = [
    `const component = ${JSON.stringify(component)};`,
    `component.module = require('${this.context}/${name}.html');`,
    `module.exports = component`,
  ];
  return code.join('\n');
};
