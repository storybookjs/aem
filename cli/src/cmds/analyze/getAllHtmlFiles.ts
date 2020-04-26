import { existsSync, lstatSync, readdirSync } from 'fs';
import { join, relative } from 'path';

const htmlFiles = {};

export const getAllHTMLFiles = async (rootPath, filter: '.html') => {
  if (!existsSync(rootPath)) throw new Error(`Unable to find rootPath: ${rootPath}`);

  const files = readdirSync(rootPath);

  files.forEach(file => {
    const filename = join(rootPath, file);
    const filepath = relative(process.cwd(), filename);
    const fileKey = filepath.includes(`jcr_root`) ? filepath.split(`jcr_root`)[1] : filepath;
    const stats = lstatSync(filepath);
    if (stats.isDirectory()) getAllHTMLFiles(filename, filter);
    else if (filename.indexOf(filter) >= 0) htmlFiles[fileKey] = { filepath };
  });

  return htmlFiles;
};
