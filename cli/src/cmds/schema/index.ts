import path from 'path';
import fs from 'fs';

import { extractModels } from './utils/extractModels';
import { getModelVariables } from './utils/getModelVariables';
import { getListVariables } from './utils/getListVariables';

const cwd = process.cwd();

// const filePath = '../../aem-sb-js-core-components/src/jcr_root/apps/core/wcm/components/accordion/v1/accordion/accordion.html';
const filePath = '../../aem-sb-js-core-components/src/jcr_root/apps/core/wcm/components/breadcrumb/v2/breadcrumb/breadcrumb.html';

export const schemaCommand = async (args, config) => {

  const htlFile = fs.readFileSync(path.join(cwd, filePath), 'utf-8');
  let models = extractModels(htlFile);
  models = models.map(model => getModelVariables(model, htlFile));
  models = models.map(model => getListVariables(model, htlFile));

  console.log('models', JSON.stringify(models, null, 2))
};

