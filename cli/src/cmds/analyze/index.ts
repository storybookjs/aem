import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';
import { getAllHTMLFiles } from './getAllHtmlFiles';

const cwd = process.cwd();

// const readAllFiles = async files => {
//   let includes = [];

//   for (let i = 0; i < files.length; i++) {
//     let filename = files[i];
//     await fs.readFile(path.resolve(cwd, filename), 'utf-8', async (err, fileContent) => {
//       if (err) {
//         console.error('Could not read file', err);
//         return;
//       }
//       fileContent = minify(fileContent, {
//         collapseWhitespace: true,
//         removeComments: true,
//         keepClosingSlash: true,
//         // preventAttributesEscaping: true,
//         removeTagWhitespace: true,
//       });
//       const { include, resource, use, paths } = await getDataSly(filename, fileContent);
//       console.log('paths:', paths)
//       if (paths.length) includes.push(paths);
//       // return includes;
//     });
//   }

//   return includes;
//   return files.map(filename => {
//     return fs.readFile(path.resolve(cwd, filename), 'utf-8', async (err, fileContent) => {
//       if (err) {
//         console.error('Could not read file', err);
//         return;
//       }
//       fileContent = minify(fileContent, {
//         collapseWhitespace: true,
//         removeComments: true,
//         keepClosingSlash: true,
//         // preventAttributesEscaping: true,
//         removeTagWhitespace: true,
//       });
//       const { include, resource, use, paths } = await getDataSly(filename, fileContent);
//       // console.log('paths:', paths)
//       if (paths.length) includes.push(paths);
//       return includes;
//     });
//   });
// };

// const getDataSly = async (filename, fileContent) => {
//   const include = [];
//   const use = [];
//   const resource = [];
//   const other = [];
//   const paths = [];
//   const dataSlyRegex = /(data-sly-(.*?)="(.*?)")/g;

//   fileContent.match(dataSlyRegex).forEach(attribute => {
//     const attributeType = attribute
//       .split(`data-sly-`)[1]
//       .split(`.`)[0]
//       .split(`=`)[0];
//     /* eslint-disable prefer-destructuring */
//     let attributeValue = attribute.split(`data-sly-${attributeType}`)[1];
//     if (attributeValue.indexOf('.') === 0) attributeValue = attributeValue.split(`=`)[1];
//     if (attributeValue.indexOf(`="`) === 0 || attributeValue.indexOf(`='`) === 0)
//       attributeValue = attributeValue.substring(2);
//     if (attributeValue.startsWith(`"`) || attributeValue.startsWith(`'`))
//       attributeValue = attributeValue.substring(1, attributeValue.length);
//     if (attributeValue.endsWith(`"`) || attributeValue.endsWith(`'`))
//       attributeValue = attributeValue.slice(0, -1);

//     if (attributeValue.includes('.html') || attributeValue.includes('/'))
//       paths.push(attributeValue);

//     switch (attributeType) {
//       case `include`: {
//         if (!attributeValue.includes(`.html`) && !attributeValue.includes(`/`))
//           include.push(attributeValue);
//         break;
//       }
//       case `use`: {
//         if (!attributeValue.includes(`.html`) && !attributeValue.includes(`/`))
//           use.push(attributeValue);
//         break;
//       }
//       case `resource`: {
//         if (!attributeValue.includes(`.html`) && !attributeValue.includes(`/`))
//           resource.push(attributeValue);
//         break;
//       }
//       default: {
//         other.push({ [attributeType]: attributeValue });
//         break;
//       }
//     }
//   });

//   if (include.length || use.length || resource.length || other.length || paths.length) {
//     /* eslint-disable no-console */
//     // console.log(`\nFile: ${filename}`);
//     /* eslint-disable no-console */
//     // if (include.length) console.log(`- Includes:`, include);
//     /* eslint-disable no-console */
//     // if (use.length) console.log(`- Models:`, use);
//     /* eslint-disable no-console */
//     // if (resource.length) console.log(`- Resources:`, resource);
//     /* eslint-disable no-console */
//     // if (other.length) console.log(`- Other:`, other);
//     /* eslint-disable no-console */
//     // if (paths.length) console.log(`- Files:`, paths);
//   }

//   return { include, resource, use, paths };
// };

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
    const files = await getAllHTMLFiles(path.resolve(cwd, componentPath), '.html');
    console.log('files:', files);
    // const includes = await readAllFiles(files);
    // console.log('includes:', includes)
  });
};
