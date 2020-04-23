import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';

const cwd = process.cwd();

const htmlFiles = [];
/* eslint-disable consistent-return */
const getAllHTMLFiles = async rootPath => {
  if (!fs.existsSync(rootPath)) {
    /* eslint-disable no-console */
    console.error('Unable to find rootPath', rootPath);
    return;
  }

  const filter = '.html';
  const files = fs.readdirSync(rootPath);

  /* eslint-disable no-plusplus */
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(rootPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) getAllHTMLFiles(filename);
    else if (filename.indexOf(filter) >= 0) htmlFiles.push(filename);
  }

  return htmlFiles;
};

/* eslint-disable no-shadow */
const readAllFiles = async files => {
  files.forEach(filename => {
    /* eslint-disable no-param-reassign */
    fs.readFile(path.resolve(cwd, filename), 'utf-8', async (err, fileContent) => {
      if (err) {
        console.error('Could not read file', err);
        return;
      }
      fileContent = minify(fileContent, {
        collapseWhitespace: true,
        removeComments: true,
        keepClosingSlash: true,
        // preventAttributesEscaping: true,
        removeTagWhitespace: true,
      });
      const { include, resource, use, files } = await getDataSly(filename, fileContent);
    });
  });

  return true;
};

const getDataSly = async (filename, fileContent) => {
  const include = [];
  const use = [];
  const resource = [];
  const other = [];
  const files = [];
  const dataSlyRegex = /(data-sly-(.*?)="(.*?)")/g;

  fileContent.match(dataSlyRegex).forEach(attribute => {
    const attributeType = attribute
      .split(`data-sly-`)[1]
      .split(`.`)[0]
      .split(`=`)[0];
    /* eslint-disable prefer-destructuring */
    let attributeValue = attribute.split(`data-sly-${attributeType}`)[1];
    if (attributeValue.indexOf('.') === 0) attributeValue = attributeValue.split(`=`)[1];
    if (attributeValue.indexOf(`="`) === 0 || attributeValue.indexOf(`='`) === 0)
      attributeValue = attributeValue.substring(2);
    if (attributeValue.startsWith(`"`) || attributeValue.startsWith(`'`))
      attributeValue = attributeValue.substring(1, attributeValue.length);
    if (attributeValue.endsWith(`"`) || attributeValue.endsWith(`'`))
      attributeValue = attributeValue.slice(0, -1);

    if (attributeValue.includes('.html') || attributeValue.includes('/'))
      files.push(attributeValue);

    switch (attributeType) {
      case `include`: {
        include.push(attributeValue);
        break;
      }
      case `use`: {
        if (!attributeValue.includes(`.html`) || !attributeValue.includes(`/`))
          use.push(attributeValue);
        break;
      }
      case `resource`: {
        resource.push(attributeValue);
        break;
      }
      default: {
        other.push({ [attributeType]: attributeValue });
        break;
      }
    }
  });

  if (include.length || use.length || resource.length || other.length || files.length) {
    /* eslint-disable no-console */
    console.log(`\nFile: ${filename}`);
    /* eslint-disable no-console */
    if (include.length) console.log(`- Includes:`, include);
    /* eslint-disable no-console */
    if (use.length) console.log(`- Models:`, use);
    /* eslint-disable no-console */
    if (resource.length) console.log(`- Resources:`, resource);
    /* eslint-disable no-console */
    if (other.length) console.log(`- Other:`, other);
    /* eslint-disable no-console */
    if (files.length) console.log(`- Files:`, files);
  }

  return { include, resource, use, files };
};

// const getAllIncludes = async (filename,fileContent) => {
//     const dataSlyIncludesRegex = /(data-sly-(call|use|include|resource))=(")/g;
//     const includesArray = [...fileContent.matchAll(dataSlyIncludesRegex)];
//     console.log(`\n\nFile: ${filename}\n\nincludesArray:\n`,includesArray);
// };

// const getAllQuotes = async (filename,fileContent) => {
//     console.log('minifiedContent:', fileContent);
// };

export const analyzeCommand = async (args, config) => {
  config.componentPaths.forEach(async componentPath => {
    const files = await getAllHTMLFiles(path.resolve(cwd, componentPath));
    const includes = await readAllFiles(files);
  });
};
