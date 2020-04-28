import { basename } from 'path';
import { minifyHTL } from '../analyze/minifyHTL';
import { fetchFromAEM } from '../../utils';

export const getFileContent = async (fileArray, componentTypes) => {
  if (!fileArray || fileArray.length === 0) throw new Error(`No files found`);

  const content = {};
  componentTypes.forEach(type => {
    content[type] = {
      html: {},
      entry: ``,
      js: ``,
      css: ``,
    };
  });

  /* eslint-disable no-plusplus, no-await-in-loop */
  for (let i = 0; i < fileArray.length; i++) {
    const { path, name } = fileArray[i];
    const rawContent = await fetchFromAEM({ url: path });
    const minifiedHTL = minifyHTL(await rawContent.text());
    const [componentType] = path.split(basename(path));
    let componentName = componentType.slice(0, -1).split('/');
    componentName = componentName[componentName.length - 1];

    if (content[componentType]) {
      if (basename(name, '.html') === componentName) {
        content[componentType].entry = minifiedHTL;
      } else {
        content[componentType].html[name] = minifiedHTL;
      }
    } else {
      content[path] = minifiedHTL;
    }
  }

  return content;
};
