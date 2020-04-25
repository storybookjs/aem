import { readFileSync } from 'fs';
import { resolve } from 'path';
import { minify } from 'html-minifier';

const cwd = process.cwd();

export const readFiles = async files => {
  const fileContents = [];

  files.forEach(filename => {
    const content = readFileSync(resolve(cwd, filename), 'utf-8');

    fileContents.push(
      minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        keepClosingSlash: true,
        preventAttributesEscaping: true,
        removeTagWhitespace: true,
      })
    );
  });

  return fileContents;
};
