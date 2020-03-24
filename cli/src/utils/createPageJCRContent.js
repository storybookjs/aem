const fetchFromAEM = require('./fetchFromAEM');

const createPageJCRContent = async config => {
    const params = [
        `jcr:primaryType=cq:PageContent`,
        `sling:resourceType=${config.aemContentDefaultPageResourceType}`,
        `title=${config.component}`,
        `cq:template=${config.aemContentDefaultPageTemplate}`
    ]

    const response = await fetchFromAEM({
        url: `${config.aemContentPath}/${config.component}/jcr:content?${params.join('&')}`,
        method: 'POST',
        errorMessage: 'Error creating JCR:Content:'
    });

    if (await response.ok) return true;
    else return false;
};

module.exports = createPageJCRContent;