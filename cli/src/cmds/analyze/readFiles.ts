import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getDataSly } from './getDataSly';

const cwd = process.cwd();

export const readFiles = async files => {
  return files.map(filename => {
    const content = readFileSync(resolve(cwd, filename), 'utf-8');
    const dataSly = getDataSly(content);
    return {
      filename,
      dataSly,
    };
  });
};
