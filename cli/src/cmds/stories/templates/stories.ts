import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { js as beautify } from 'js-beautify';
import { log, error } from '../../../utils';
import storiesRender from './stories-render';
import {
  IMPORT_FETCH_FROM_AEM,
  IMPORT_AEM_METADATA,
  IMPORT_AEM_STYLE_SYSTEM,
  IMPORT_GRID,
} from './import-config';
import StoryConfig from './story-config';

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);
const TAGNAME_DIV = 'div';

export const createStories = async config => {
  const imports = [IMPORT_FETCH_FROM_AEM, IMPORT_AEM_METADATA];
  const stories = getStoryConfigs(config.stories);
  const existingContents = config.storyFileExists ? await readFilePromise(config.storyPath, 'utf8') : '';
  const cssClasses = [
    { wrap: true, text: config.component.name },
    { wrap: true, text: 'component' },
  ];

  if (config.storybookAEMStyleSystem) {
    cssClasses.push({ wrap: false, text: 'StyleSystem' });
    imports.push(IMPORT_AEM_STYLE_SYSTEM);
  }

  if (config.storybookAEMGrid) {
    cssClasses.push({ wrap: false, text: 'Grid' });
    imports.push(IMPORT_GRID);
  }

  const storyFileString = storiesRender({
    imports,
    storyRoot: config.storyRoot,
    componentName: config.component.name,
    cssClasses,
    tagName: TAGNAME_DIV,
    stories,
    onlyAppendNewStories: config.storyFileExists,
  });

  const beautifiedFullFile = beautify(existingContents + storyFileString, {
    brace_style: 'collapse,preserve-inline',
  });

  await writeFilePromise(config.storyPath, beautifiedFullFile);

  log(`Created or Updated ${config.storyPath}`);
  log(`Story file created for the ${config.component.name}`);
};

function getStoryConfigs(storyData) {
  return storyData.map(
    story =>
      new StoryConfig({
        name: story.name,
        contentPath: story.contentPath,
      })
  );
}
