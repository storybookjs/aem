import { getDirectories } from './getDirectories';

export const getChoicesFromDirectories = directoryPath => {
  return getDirectories(directoryPath).map(directory => ({
    title: directory,
    value: directory,
  }));
};
