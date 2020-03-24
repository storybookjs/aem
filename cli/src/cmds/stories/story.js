const path = require('path');
const prompts = require('prompts');

const error = require('../../utils/error');
const getDirectories = require('../../utils/getDirectories');
const toCamelCase = require('../../utils/toCamelCase');
const getEditDialog = require('../../utils/getEditDialog');

const storiesTemplate = require('./templates/stories');
const createContentFromStories = require('../content/contentFromStories');

const cwd = process.cwd();

module.exports = async args => {
    const packageJSON = require(path.resolve(cwd, 'package.json'));
    
    if (Object.entries(packageJSON).length === 0) {
        error('No package.json file found. Please run this from the directory with the package.json file for your project', true);
    } else {

        let config = packageJSON['storybook-aem'];
        let storyConfig = {};

        const componentBasePath = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.componentPath );
        const componentType = await prompts([
            {
                type: 'autocomplete',
                name: 'componentType',
                message: 'Generate a Story for which component type?',
                choices: getDirectories(componentBasePath).map( component => { return { title: component, value: component }})
            }
        ]);
        storyConfig = { ...storyConfig, ...componentType };

        const componentPath = path.resolve(cwd, config.projectRoot, config.relativeProjectRoot, config.componentPath, componentType.componentType );
        const componentConfig = await prompts([
            {
                type: 'autocomplete',
                name: 'component',
                message: 'Generate a Storybook Story for which component?',
                choices: getDirectories(componentPath).map( component => { return { title: component, value: component }})
            },
            {
                type: 'confirm',
                name: 'hasStories',
                message: 'Would you like to add some initial stories? We will add the default empty story for you',
                initial: true
            },
            {
                type: prev => true ? 'list' : null,
                name: 'stories',
                message: 'Add a comma separated list of stories:',
                separator: ',',
                format: res => {
                    if (!res.length) return false;
                    // else return res.map( story => toCamelCase(story));
                    else return res;
                }
            }
        ]);

        storyConfig = { ...storyConfig, ...componentConfig };

        if (storyConfig.stories.length && config.aemContentPath) {
            storyConfig.createAEMContent = await(prompts({
                type: 'confirm',
                name: 'createAEMContent',
                message: `Create content in AEM for the stories you've listed?` ,
                initial: true,
                format: res => res
            }));

            storyConfig.stories = storyConfig.stories.map( story => {
                let contentPath = false;
                if (storyConfig.createAEMContent) {
                    contentPath = `${config.aemContentPath}/${storyConfig.component}/jcr:content${config.aemContentDefaultPageContentPath}/${toCamelCase(story)}`;
                }
    
                return {
                    name: toCamelCase(story),
                    displayName: story,
                    contentPath: contentPath
                };
            });
        }        

        config = { ...config, ...storyConfig };

        // let editDialog = getEditDialog(config);
        // console.log('editDialog:', editDialog)

        storiesTemplate(config);
        createContentFromStories(config);
    }
}