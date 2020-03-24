const path = require('path');
const parser = require('xml2json');

const JCR_ROOT_KEY = 'jcr:root';
const JCR_TITLE_KEY = 'jcr:title';

module.exports = async function componentLoader(source) {
  const resourceType = this.context.substring(this.rootContext.length + 1);
  const json = JSON.parse(parser.toJson(source));
  const pathBaseName = path.basename(this.context);
  const component = {
    resourceType,
    properties: {
      JCR_TITLE_KEY: `${json[JCR_ROOT_KEY] ? json[JCR_ROOT_KEY][JCR_TITLE_KEY] : pathBaseName}`,
    },
  };

  const code = [
    `const component = ${JSON.stringify(component)};`,
    `component.module = require('${this.context}/${pathBaseName}.html');`,
    `module.exports = component`,
  ];
  return code.join('\n');
};
