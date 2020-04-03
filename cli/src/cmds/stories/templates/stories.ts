import * as fs from 'fs';
import * as path from 'path';
import { log, error } from '../../../utils';

export const getStoriesTemplate = config => {
  let storyPath;
  if (config.storybookStoryLocation) {
    storyPath = path.resolve(
      process.cwd(),
      config.storybookStoryLocation,
      `${config.component.name}.stories.js`
    );
  } else {
    storyPath = path.resolve(
      process.cwd(),
      config.component.relativePath
      `${config.component.name}.stories.js`
    );
  }
  const fileExists = fs.existsSync(storyPath);
  const fileContents = [];

  try {
    // Add the existing file to the fileContents
    if (fileExists) {
      fileContents.push(fs.readFileSync(storyPath, 'utf8'));
    } else {
      // Create the basics for the file

      // Add the empty story to the list
      config.stories.unshift({
        name: 'empty',
        displayName: 'Empty Story',
        contentPath: config.aemContentPath
          ? `${config.aemContentPath}/${config.component.name}/jcr:content${config.aemContentDefaultPageContentPath}/empty`
          : ``,
      });

      fileContents.push(`/**`);
      fileContents.push(` * Storybook stories for the ${config.component.name} component`);
      fileContents.push(` */`);

      if (config.jsFramework === 'react') {
        fileContents.push(`import React, { Component } from 'react';`);
      }

      if (config.jsFramework !== 'react') {
        fileContents.push(`import { aemMetadata } from '@storybook/aem';`);
        fileContents.push(`import { fetchFromAEM } from 'storybook-aem-wrappers';`);
      }

      if (config.storybookAEMGrid) {
        fileContents.push(`import { Grid } from 'storybook-aem-grid';`);
      }

      if (config.storybookAEMStyleSystem) {
        fileContents.push(`import { StyleSystem } from 'storybook-aem-style-system';`);
      }

      fileContents.push(``);

      const defaultTitle = config.storyRoot
        ? `${config.storyRoot}/${config.component.name}`
        : `${config.component.name}`;
      fileContents.push(`export default {`);
      fileContents.push(`    title: '${defaultTitle}',`);
      if (config.jsFramework !== 'react') {
        fileContents.push(`    decorators: [`);
        fileContents.push(`        aemMetadata({`);
        fileContents.push(`            decorationTag: {`);
        fileContents.push(`                cssClasses: [`);
        fileContents.push(`                    '${config.component.name}',`);
        fileContents.push(`                    'component',`);

        if (config.storybookAEMStyleSystem) {
          fileContents.push(`                    StyleSystem,`);
        }

        if (config.storybookAEMGrid) {
          fileContents.push(`                    Grid,`);
        }

        fileContents.push(`                ],`);
        fileContents.push(`                tagName: 'div'`);
        fileContents.push(`            }`);
        fileContents.push(`        })`);
        fileContents.push(`    ],`);
      }
      fileContents.push(`};`);
    }
  } catch (err) {
    throw error(err, true);
  }

  config.stories.forEach(story => {
    fileContents.push(``);
    fileContents.push(`const ${story.name}ContentPath = "${story.contentPath || ''}";`);
    if (config.jsFramework !== 'react') {
      fileContents.push(`export const ${story.name} = () => ({`);
      fileContents.push(`    template: async () => fetchFromAEM(${story.name}ContentPath)`);
      fileContents.push(`});`);
    }
    if (config.jsFramework === 'react') {
      fileContents.push(`export const ${story.name} = () => (`);
      fileContents.push(`    <Wrapper`);
      fileContents.push(`        contentPath={${story.name}ContentPath}`);

      if (config.storybookAEMStyleSystem) {
        fileContents.push(`        styleSystem={StyleSystem()}`);
      }

      if (config.storybookAEMGrid) {
        fileContents.push(`        grid={Grid()}`);
      }

      fileContents.push(`        classes="${config.component.name}"`);
      fileContents.push(`    />`);
      fileContents.push(`);`);
    }
    fileContents.push(`${story.name}.story = {`);
    fileContents.push(`    name: '${story.displayName}',`);
    fileContents.push(`    parameters: {`);
    fileContents.push(`    }`);
    fileContents.push(`};`);
  });

  fs.writeFile(storyPath, fileContents.join('\n'), err => {
    if (err) throw err;
    log(
      `Created or Updated ${config.component.name}.stories.js`
    );
  });

  log(`Story file created for the ${config.component.name}`);
  log(`Story file -> ${storyPath}`);
};
