import * as path from 'path';
import * as fs from 'fs';
import xml2json from 'xml2json';
import { log, xmlToJSONCleanup } from './index';

export const getCQTemplate = async config => {
  const cqTemplatePath = path.resolve(
    process.cwd(),
    config.component.relativePath,
    `_cq_template.xml`
  );

  try {
    const xml = fs.readFileSync(cqTemplatePath, 'utf-8');

    if (!xml) {
      log(`There was no _cq_template.xml file. Skipping default content.`);
      return false;
    }
    const json = JSON.parse(xml2json.toJson(xml))['jcr:root'];
    // Add the sling:resourceType so that the component can be created
    json['sling:resourceType'] = config.component.resourceType;

    return xmlToJSONCleanup(json);
  } catch {
    // This is not an error scenario. It is okay to not have a _cq_template.
    log(
      `No _cq_template.xml found for the '${config.component.name}' component. Default content will be generated.`
    );
    return false;
  }
};
