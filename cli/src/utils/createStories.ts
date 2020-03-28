import { fetchFromAEM, getCQTemplate, log } from './index';

const { exec } = require('child_process');

export const createStories = async config => {
  const baseURL = `${config.aemContentPath}/${config.component}/jcr:content${config.aemContentDefaultPageContentPath}`;
  const cqTemplate = await getCQTemplate(config);
  const editorURL = `http://localhost:4502/editor.html${config.aemContentPath}/${config.component}.html`;

  const content = {};

  /* eslint-disable array-callback-return */
  config.stories.map(story => {
    // Heading First
    const heading = {
      'jcr:primaryType': 'nt:unstructured',
      'sling:resourceType': `${config.aemStoryHeadingComponentResourceType}`,
    };
    heading[
      `${config.aemStoryHeadingComponentTitleProperty}`
    ] = `Story Content for '${story.name}' story`;

    // Then Component
    let component = {};

    if (!cqTemplate) {
      component['jcr:primaryType'] = 'nt:unstructured';
      component[
        'sling:resourceType'
      ] = `${config.namespace}/components/${config.componentType}/${config.component}`;
      component[
        `${config.aemStoryHeadingComponentTitleProperty}`
      ] = `Story Content for '${story.name}' story`;
    } else {
      component = cqTemplate;
    }

    component['jcr:storybookStory'] = `${config.component}|${story.displayName}`;

    content[`${story.name}Heading`] = heading;
    content[`${story.name}`] = component;
  });

  const componentCreation = await fetchFromAEM({
    url: `${baseURL}?${[
      `:contentType=json`,
      `:operation=import`,
      `:content=${JSON.stringify(content)}`,
    ].join('&')}`,
    method: 'POST',
    errorMessage: `Error creating story(ies)`,
  });

  if (await componentCreation.ok) {
    log(`Successfully created AEM Content for your stories`);
    log(`Your stories have been successfully created.`);
    log(`You can now view and edit your story content`);
    log(`Story content -> ${editorURL}`);

    exec(`open ${editorURL}`);

    return true;
  }
  log(`There was a problem creating the AEM content for your stories`);
  return false;
};
