import path from 'path';
import fs from 'fs';

import { extractModels } from './utils/extractModels';

const cwd = process.cwd();

const filePath = '../../aem-sb-js-core-components/src/jcr_root/apps/core/wcm/components/accordion/v1/accordion/accordion.html';
// const filePath = '../../aem-sb-js-core-components/src/jcr_root/apps/core/wcm/components/breadcrumb/v2/breadcrumb/breadcrumb.html';

export const schemaCommand = async (args, config) => {

  const htlFile = fs.readFileSync(path.join(cwd, filePath), 'utf-8');
  let models = extractModels(htlFile);
  models = models.map(model => getModelVariables(model, htlFile));

  console.log('models', JSON.stringify(models, null, 2))
};


const getModelVariables = (model, htlFile) => {
  const { variable, schema } = model;
  // trying to match anything that starts ${
  // ends with } 
  // and get what's in between

  htlFile.split('\n')
    .filter(line => line.includes(variable) && (line.includes('${') || line.includes('}') || line.includes(`${variable}.`)))
    .map(line => {
      const expression = line.split('${')[1].split('}')[0];
      const expressions = expression
        .split(' ')
        .filter(expressionPart => expressionPart.includes(`${variable}.`))
        .map(expressionPart => {
          const childVariable = expressionPart.split(`${variable}.`)[1];
          if (!childVariable.includes('.')) schema[childVariable] = '';
          else {
            // eventually make this recursive
            const [parent, grandchild] = childVariable.split('.');
            schema[parent] = {
              [grandchild]: ''
            }
          }
          console.log('childVariable', childVariable)
          return childVariable;
        })
      console.log('expressions', expressions)
    });

  return model;
}