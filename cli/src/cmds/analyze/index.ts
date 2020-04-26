import { resolve } from 'path';
import { getAllHTMLFiles } from './getAllHtmlFiles';
import { readFiles } from './readFiles';
import { cacheContent } from './cacheContent';

export const analyzeCommand = async (args, config) => {
  config.componentPaths.forEach(async componentPath => {
    const files = await getAllHTMLFiles(resolve(process.cwd(), componentPath), '.html');
    const fileContents = readFiles(files);
    cacheContent(fileContents, config);
  });
};
