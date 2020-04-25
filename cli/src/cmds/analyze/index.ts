import path from 'path';
import { getAllHTMLFiles } from './getAllHtmlFiles';
import { readFiles } from './readFiles';

const cwd = process.cwd();

export const analyzeCommand = async (args, config) => {
  config.componentPaths.forEach(async componentPath => {
    const files = await getAllHTMLFiles(path.resolve(cwd, componentPath), '.html');
    const fileContents = await readFiles(files);
    // console.log(JSON.stringify(fileContents,null,2));
  });
};
