const path = require('path');
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

  if (json['jcr:root'] && json['jcr:root']['componentGroup']) {
    const chunkName = json['jcr:root']['componentGroup'];
    code.push(`require('${chunkName}');`)
  }

  code.push(`const component = ${JSON.stringify(component)};\n
    component.module = require('${this.context}/${pathBaseName}.html');\n
    module.exports = component\n`);

  return code.join('\n');
};
