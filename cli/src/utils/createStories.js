const { exec } = require('child_process');

const fetchFromAEM = require('./fetchFromAEM');
const getCQTemplate = require('./getCQTemplate');

const createStories = async config => {
    let baseURL = `${config.aemContentPath}/${config.component}/jcr:content${config.aemContentDefaultPageContentPath}`;
    let cqTemplate = await getCQTemplate(config);
    let editorURL = `http://localhost:4502/editor.html${config.aemContentPath}/${config.component}.html`;

    const content = {};
    
    config.stories.map( story => {
        // Heading First
        let heading = {
            'jcr:primaryType': 'nt:unstructured',
            'sling:resourceType': `${config.aemStoryHeadingComponentResourceType}`,
        };
        heading[`${config.aemStoryHeadingComponentTitleProperty}`] = `Story Content for '${story.name}' story`;

        // Then Component
        let component = {};
        
        if (!cqTemplate) {
            component['jcr:primaryType'] = 'nt:unstructured';
            component['sling:resourceType'] = `${config.namespace}/components/${config.componentType}/${config.component}`;
            component[`${config.aemStoryHeadingComponentTitleProperty}`] = `Story Content for '${story.name}' story`;
        } else {
            component = cqTemplate;
        }

        component['jcr:storybookStory'] = `${config.component}|${story.displayName}`;

        content[`${story.name}Heading`] = heading;
        content[`${story.name}`] = component;
    });

    // console.log('JSON.stringify(content)',JSON.stringify(content));
    
    const componentCreation = await fetchFromAEM({
        url: `${baseURL}?${[
            `:contentType=json`,
            `:operation=import`,
            `:content=${JSON.stringify(content)}`
        ].join('&')}`,
        method: 'POST',
        errorMessage: `Error creating story(ies)`
    });

    if (await componentCreation.ok) {
        console.log(`[storybook-aem] Successfully created AEM Content for your stories`);
        console.log(`[storybook-aem] Your stories have been successfully created.`);
        console.log(`[storybook-aem] You can now view and edit your story content`);
        console.log(`[storybook-aem] Story content -> ${editorURL}`);

        exec(`open ${editorURL}`);

        return true;
    } else {
        console.log(`[storybook-aem] There was a problem creating the AEM content for your stories`);
        return false;
    }
};

module.exports = createStories;