import { createPageJCRContent, createPage, fetchFromAEM, createStories, log } from '../../utils';

/* eslint-disable consistent-return */
export const createContentFromStories = async config => {
  if (!config || !config.createAEMContent || config.stories.length === 0) return false;

  log(`Checking to see if '${config.component}' Component Page exists in AEM...`);
  const pageCheckResponse = await fetchFromAEM({
    url: `${config.aemContentPath}/${config.component}.infinity.json`,
    method: 'GET',
    errorMessage: 'component.infinity.json error:',
  });

  if (await pageCheckResponse.ok) {
    const pageJSON = await pageCheckResponse.json();
    log(`Component Page for '${config.component}' component exists.`);

    if (
      Object.prototype.hasOwnProperty.call(pageJSON, 'jcr:content') &&
      Object.prototype.hasOwnProperty.call(pageJSON['jcr:content'], 'cq:template') &&
      pageJSON['jcr:content']['cq:template'] === config.aemContentDefaultPageTemplate
    ) {
      log(`Component Page exists and has page content on expected template.`);
      log(`Creating content for stories...`);
      createStories(config);
    }
  } else if (pageCheckResponse.status === 404) {
    log(`Component page doesn't exist.`);
    log(`Creating Component. Waiting...`);

    const pageCreation = await createPage(config);
    if (await pageCreation) {
      log(`Component page created for '${config.component}' component.`);
      log(`Creating JCR:Content for '${config.component}' component. Waiting...`);

      const jcrContentCreation = await createPageJCRContent(config);
      if (await jcrContentCreation) {
        log(`Creating JCR:Content for '${config.component}' component succeeded.`);
        log(`Creating content for stories...`);
        const storyCreationStatus = await createStories(config);
        if (await storyCreationStatus) {
          log(`Stories created successfully.`);
          log(
            `Story content -> http://localhost:4502/editor.html${config.aemContentPath}/${config.component}.html`
          );
        } else {
          log(`Stories creation failed. :(`);
        }
      } else {
        log(`Creating JCR:Content for '${config.component}' component failed.`);
      }
    } else {
      log(`Component page WAS NOT created for '${config.component}' component.`);
    }
  } else {
    log(`a problem occurred`, pageCheckResponse);
  }
};
