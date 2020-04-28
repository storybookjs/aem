import { basename } from 'path';
import { minifyHTL } from '../analyze/minifyHTL';
import { fetchFromAEM } from '../../utils';

export const getFileContent = async (fileArray, componentTypes) => {
  if (!fileArray || fileArray.length === 0) throw new Error(`No files found`);

  const content = {};
  /* eslint-disable no-return-assign */
  componentTypes.forEach(type => (content[type] = {}));

  /* eslint-disable no-plusplus, no-await-in-loop */
  for (let i = 0; i < fileArray.length; i++) {
    const { path, name } = fileArray[i];
    const rawContent = await fetchFromAEM({ url: path });
    const [componentType] = path.split(basename(path));
    if (content[componentType]) {
      content[componentType][name] = minifyHTL(await rawContent.text());
    } else {
      content[path] = minifyHTL(await rawContent.text());
    }
  }

  return content;
};
