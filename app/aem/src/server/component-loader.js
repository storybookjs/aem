const path = require('path');
const parser = require('xml2json');

module.exports = async function(source) {
  const resourceType = this.context.substring(this.rootContext.length + 1);
  const json = JSON.parse(parser.toJson(source));
  const name = json['jcr:root'] ? json['jcr:root']['jcr:title'] : path.basename(this.context);
  const code = [];

  const component = {
    resourceType,
    properties: {
      'jcr:title': `${name}`,
    }
  };

  if (json['jcr:root'] && json['jcr:root']['componentGroup']) {
    const chunkName = json['jcr:root']['componentGroup'];
    code.join(`require('${json['jcr:root']['componentGroup']}')\n`)
  }
  
  if (component && this.context && name) {
    code.join(`const component = ${JSON.stringify(component)};\n
     component.module = require('${this.context}/${name}.html');\n
     module.exports = component;\n`);
  }

  return code.join('\n');
};
