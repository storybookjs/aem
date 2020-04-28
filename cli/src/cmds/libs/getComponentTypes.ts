import { basename } from 'path';

export const getComponentTypes = fileArray => {
  if (!fileArray || fileArray.length === 0) throw new Error(`No files found`);

  return fileArray
    .filter(({ path, name }) => path.split(name)[0].includes(name.split('.html')[0]))
    .map(({ path }) => path.split(basename(path))[0]);
};
