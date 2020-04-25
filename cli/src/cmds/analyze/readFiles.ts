import { readFileSync } from 'fs';
import { resolve } from 'path';
import { minify } from 'html-minifier';

const cwd = process.cwd();

export const readFiles = async files => {
  const fileContents = [];

  for (let i = 0; i < files.length; i += 1) {
    const filename = files[i];
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
  }

  return fileContents;
};
