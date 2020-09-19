import { basename } from 'path';
import { minifyHTL } from '../analyze/minifyHTL';
import { fetchFromAEM } from '../../utils';

/* eslint-disable no-param-reassign */
export const getFileContent = async (file) => {
  if (!file) throw new Error(`No file found`);
  const rawContent = await fetchFromAEM({ url: file.path });
  return minifyHTL(await rawContent.text());
};
