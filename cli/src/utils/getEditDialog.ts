import * as fs from 'fs';
import * as path from 'path';
import xml2json from 'xml2json';
import { log, parseEditDialog, xmlToJSONCleanup } from './index';

export const getEditDialog = config => {
  log('getEditDialog:');

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
      log(`There was no _cq_dialog/.content.xml. Skipping default content.`);
      return false;
    }
    const json = xmlToJSONCleanup(JSON.parse(xml2json.toJson(xml)));
    return parseEditDialog(json, null);
  } catch (e) {
    log(
      `There was an error reading the _cq_dialog/.content.xml for the '${config.component}' component`,
      e
    );
    return false;
  }
};
