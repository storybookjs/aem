import { minifyHTL } from '../analyze/minifyHTL';
import { fetchFromAEM } from '../../utils';

export const getFileContent = async fileArray => {
  if (!fileArray || fileArray.length === 0) throw new Error(`No files found`);

  const content = {};

  /* eslint-disable no-plusplus, no-await-in-loop */
  for (let i = 0; i < fileArray.length; i++) {
    const { path } = fileArray[i];
    const rawContent = await fetchFromAEM({ url: path });
    content[path] = minifyHTL(await rawContent.text());
  }

  return content;
};
