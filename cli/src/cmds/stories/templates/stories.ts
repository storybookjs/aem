import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { js as beautify } from 'js-beautify';
import { log, error } from '../../../utils';
import storiesRender from './stories-render';
import { IMPORT_FETCH_FROM_AEM, IMPORT_AEM_METADATA, IMPORT_AEM_STYLE_SYSTEM, IMPORT_GRID } from './import-config';
import StoryConfig from './story-config';

const existsPromise = promisify(fs.exists);
const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);
const TAGNAME_DIV = 'div';

export const createStories = async config => {
    const imports = [ IMPORT_FETCH_FROM_AEM, IMPORT_AEM_METADATA ];
    const storyPath = getStoryPath(config);
    const stories = getStoryConfigs(config.stories);
    const storyFileExists = await existsPromise(storyPath);
    const existingContents = storyFileExists ? await readFilePromise(storyPath, 'utf8') : '';
    const cssClasses = [
      { wrap: true, text: config.component.name },
      { wrap: true, text: 'component' }
    ];

    if (!storyFileExists) {
      stories.unshift(getEmptyStory(config));
    }

    if (config.storybookAEMStyleSystem) {
        cssClasses.push({ wrap: false, text: 'StyleSystem' });
        imports.push(IMPORT_AEM_STYLE_SYSTEM);
    }

    if (config.storybookAEMGrid) {
        cssClasses.push({ wrap: false, text: 'Grid' });
        imports.push(IMPORT_GRID);
    }

    const storyFileString = storiesRender({
        imports: imports,
        storyRoot: config.storyRoot,
        componentName: config.component.name,
        cssClasses: cssClasses,
        tagName: TAGNAME_DIV,
        stories: stories,
        onlyAppendNewStories: storyFileExists
    });

    const beautifiedFullFile = beautify(existingContents + storyFileString, { "brace_style": "collapse,preserve-inline" });

    await writeFilePromise(storyPath, beautifiedFullFile);

    log(`Created or Updated ${storyPath}`);
    log(`Story file created for the ${config.component}`);
};

function getStoryPath(config) {
    return path.resolve(
        process.cwd(),
        config.storybookStoryLocation ? config.storybookStoryLocation : config.component.relativePath,
        `${config.component.name}.stories.js`
    );
}

function getEmptyStory(config) {
    return new StoryConfig({
        name: 'empty',
        contentPath: config.aemContentPath
            ? `${config.aemContentPath}/${config.component.name}/jcr:content${config.aemContentDefaultPageContentPath}/empty`
            : ``,
    });
}

function getStoryConfigs(storyData) {
    return storyData.map(story => new StoryConfig({
        name: story.name,
        contentPath: story.contentPath
    }));
}
