const path = require('path');
const fs = require('fs');
const xml2json = require('xml2json');
const xmlToJSONCleanup = require('./xmlToJSONCleanup');

export const getCQTemplate = async config => {
  const cqTemplatePath = path.resolve(
    process.cwd(),
    config.projectRoot,
    config.relativeProjectRoot,
    config.componentPath,
    config.componentType,
    config.component,
    `_cq_template.xml`
  );

  try {
    const xml = fs.readFileSync(cqTemplatePath, 'utf-8');

    if (!xml) {
      console.log(`[sb-aem] There was no _cq_template.xml file. Skipping default content.`);
      return false;
    }
    const json = JSON.parse(xml2json.toJson(xml))['jcr:root'];
    // Add the sling:resourceType so that the component can be created
    json[
      'sling:resourceType'
    ] = `${config.namespace}/components/${config.componentType}/${config.component}`;

    return xmlToJSONCleanup(json);
  } catch (e) {
    console.error(
      `[sb-aem] There was an error reading the _cq_template.xml for the '${config.component}' component`,
      e
    );
    return false;
  }
};
