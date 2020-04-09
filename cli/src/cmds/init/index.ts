import existingProject from './questions/existingProject';
import install from './install';

export const initCommand = async args => {
  const answers = await existingProject(args);
  return install(answers);
};
