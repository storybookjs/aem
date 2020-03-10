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
    try {
      require(chunkName);
      code.push(`require('${chunkName}');`)
    } catch (e) {}
  }

  code.push(`const component = ${JSON.stringify(component)};`)
  code.push(`component.module = require('${this.context}/${pathBaseName}.html');`)
  code.push(`module.exports = component`);

  return code.join('\n');
};
