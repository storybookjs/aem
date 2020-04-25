import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getReferencedFiles } from './getReferencedFiles';
import { getUseModels } from './getUseModels';
import { getModelSchema } from './getModelSchema';
import { getCss } from './getCss';
import { getJs } from './getJs';

const cwd = process.cwd();

export const readFiles = async files => {
  return files.map(filename => {
    const htl = readFileSync(resolve(cwd, filename), 'utf-8');
    return {
      filename,
      htl,
      css: getCss(),
      js: getJs(),
      referencedFiles: getReferencedFiles(htl),
      useModels: getUseModels(htl),
      modelSchema: getModelSchema(htl),
    };
  });
};
