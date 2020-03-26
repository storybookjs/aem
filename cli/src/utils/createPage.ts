import { fetchFromAEM } from './fetchFromAEM';

export const createPage = async config => {
  const response = await fetchFromAEM({
    url: `${config.aemContentPath}/${config.component}?jcr:primaryType=cq:Page`,
    method: 'POST',
    errorMessage: 'Error creating page:',
  });

  if (await response.ok) return true;
  return false;
};
