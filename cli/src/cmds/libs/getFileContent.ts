import { basename } from 'path';
import { minifyHTL } from '../analyze/minifyHTL';
import { fetchFromAEM } from '../../utils';

/* eslint-disable no-param-reassign */
export const getFileContent = async (fileArray, cache) => {
  if (!fileArray || fileArray.length === 0) throw new Error(`No files found`);

  /* eslint-disable no-plusplus, no-await-in-loop */
  for (let i = 0; i < fileArray.length; i++) {
    const { path, name } = fileArray[i];
    const rawContent = await fetchFromAEM({ url: path });
    const minifiedHTL = minifyHTL(await rawContent.text());
    const [componentType] = path.split(basename(path));
    let componentName = componentType.slice(0, -1).split('/');
    componentName = componentName[componentName.length - 1];

    if (cache[componentType]) {
      if (basename(name, '.html') === componentName) {
        cache[componentType].entry = minifiedHTL;
      } else {
        cache[componentType].html[name] = minifiedHTL;
      }
    } else {
      cache[path] = minifiedHTL;
    }
  }

  return cache;
};
