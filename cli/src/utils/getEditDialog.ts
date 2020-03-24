const fs = require('fs');
const path = require('path');
const xml2json = require('xml2json');
const xmlToJSONCleanup = require('./xmlToJSONCleanup');
const parseEditDialog = require('./parseEditDialog');

export const getEditDialog = config => {
  console.log('getEditDialog:');

  const cqDialogPath = path.resolve(
    process.cwd(),
    config.projectRoot,
    config.relativeProjectRoot,
    config.componentPath,
    config.componentType,
    config.component,
    `_cq_dialog`,
    `.content.xml`
  );
  try {
    const xml = fs.readFileSync(cqDialogPath, 'utf-8');

    if (!xml) {
      console.log(`[sb-aem] There was no _cq_dialog/.content.xml. Skipping default content.`);
      return false;
    }
    const json = xmlToJSONCleanup(JSON.parse(xml2json.toJson(xml)));
    return parseEditDialog(json);
  } catch (e) {
    console.error(
      `[sb-aem] There was an error reading the _cq_dialog/.content.xml for the '${config.component}' component`,
      e
    );
    return false;
  }
};
