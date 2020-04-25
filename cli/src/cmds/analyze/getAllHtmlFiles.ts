import { existsSync, lstatSync, readdirSync } from 'fs';
import { join } from 'path';

const htmlFiles = [];

export const getAllHTMLFiles = async (rootPath, filter: '.html') => {
  if (!existsSync(rootPath)) throw new Error(`Unable to find rootPath: ${rootPath}`);

  const files = readdirSync(rootPath);

  files.forEach(file => {
    const filename = join(rootPath, file);
    const stats = lstatSync(filename);
    if (stats.isDirectory()) getAllHTMLFiles(filename, filter);
    else if (filename.indexOf(filter) >= 0) htmlFiles.push(filename);
  });

  return htmlFiles;
};
