const { fetchFromAEM } = require('./fetchFromAEM');

export const createPageJCRContent = async config => {
  const params = [
    `jcr:primaryType=cq:PageContent`,
    `sling:resourceType=${config.aemContentDefaultPageResourceType}`,
    `title=${config.component}`,
    `cq:template=${config.aemContentDefaultPageTemplate}`,
  ];

  const response = await fetchFromAEM({
    url: `${config.aemContentPath}/${config.component}/jcr:content?${params.join('&')}`,
    method: 'POST',
    errorMessage: 'Error creating JCR:Content:',
  });

  if (await response.ok) return true;
  return false;
};
