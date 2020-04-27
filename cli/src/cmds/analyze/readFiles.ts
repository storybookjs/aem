import { readFileSync } from 'fs';
import { minifyHTL } from './minifyHTL';
import { getReferencedFiles } from './getReferencedFiles';
import { getUseModels } from './getUseModels';
import { getModelSchema } from './getModelSchema';
import { getCss } from './getCss';
import { getJs } from './getJs';
import { log } from '../../utils';

/* eslint-disable no-param-reassign */
export const readFiles = files => {
  /* eslint-disable array-callback-return */
  Object.keys(files).map(key => {
    const { filepath } = files[key];
    const htl = readFileSync(filepath, 'utf-8');
    let minifiedHTL = htl;
    try {
      minifiedHTL = minifyHTL(htl);
    } catch (e) {
      /* eslint-disable no-console */
      console.warn(`\nError minifying HTL of file: ${filepath}\n\n`, e, `\n`);
    }
    log(`Analyzing file: ${filepath}`);
    files[key] = {
      ...files[key],
      htl: minifiedHTL,
      css: getCss(),
      js: getJs(),
      referencedFiles: getReferencedFiles(htl),
      useModels: getUseModels(htl),
      modelSchema: getModelSchema(htl),
    };
  });
  return files;
};
