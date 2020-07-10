import path from 'path';
import fs from 'fs';
const cwd = process.cwd();

const accordionPath = '../../aem-sb-js-core-components/src/jcr_root/apps/core/wcm/components/accordion/v1/accordion/accordion.html';

export const schemaCommand = async (args, config) => {

  const htlFile = fs.readFileSync(path.join(cwd, accordionPath), 'utf-8');
  const models = extractModels(htlFile);

  console.log('models', models)
}

const extractModels = htlFile => htlFile.split('\n')
  .filter(line => line.indexOf(`data-sly-use`) !== -1)
  .map(line => {
    let [variable, model] = line.split('data-sly-use')[1].split(`=`);
    if (variable.startsWith(`.`)) variable = variable.substr(1);
    if (model.endsWith(`\r`)) model = model.slice(0, -1);
    if (model.startsWith(`'`) || model.startsWith(`"`)) model = model.substr(1);
    if (model.endsWith(`'`) || model.endsWith(`"`)) model = model.slice(0, -1);
    console.log('variable,model', variable, model)

    return { variable, model, schema: {} };
  });
