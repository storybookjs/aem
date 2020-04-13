import { navigatePrompt } from './navigatePrompt';

export const resourceTypePrompt = async (startingPath, message) => {
  const selectedPath = await navigatePrompt(startingPath, message);

  if (selectedPath[selectedPath.indexOf('jcr_root') + 1] === 'conf') {
    // If it is a /jcr_root/conf path then include the 'conf'.
    return selectedPath.slice(selectedPath.indexOf('jcr_root') + 1).join('/');
  } else {
    // If it is a /jcr_root/apps path then do not include the 'apps'.
    return selectedPath.slice(selectedPath.indexOf('jcr_root') + 2).join('/');
  }
};
