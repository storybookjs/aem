import * as fs from 'fs';
import * as path from 'path';
import { log, error } from '../../../utils';

export const getStoriesTemplate = config => {
  const storyPath = path.resolve(
    process.cwd(),
    config.projectRoot,
    config.relativeProjectRoot,
    config.componentPath,
    config.componentType,
    config.component,
    `${config.component}.stories.js`
  );
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
          ? `${config.aemContentPath}/${config.component}/jcr:content${config.aemContentDefaultPageContentPath}/empty`
          : ``,
      });

      fileContents.push(`/**`);
      fileContents.push(` * Storybook stories for the ${config.component} component`);
      fileContents.push(` */`);

      if (config.jsFramework === 'react') {
        fileContents.push(`import React, { Component } from 'react';`);
      }

      if (config.jsFramework !== 'react') {
        fileContents.push(`import { aemMetadata } from '@storybook/aem';`);
        fileContents.push(`import { fetchFromAEM } from 'storybook-aem-wrappers';`);
      }

      fileContents.push(`import { Grid } from 'storybook-aem-grid';`);
      fileContents.push(`import { StyleSystem } from 'storybook-aem-style-system';`);
      fileContents.push(``);

      const defaultTitle = config.storyRoot
        ? `${config.storyRoot}/${config.component}`
        : `${config.component}`;
      fileContents.push(`export default {`);
      fileContents.push(`    title: '${defaultTitle}',`);
      if (config.jsFramework !== 'react') {
        fileContents.push(`    decorators: [`);
        fileContents.push(`        aemMetadata({`);
        fileContents.push(`            decorationTag: {`);
        fileContents.push(
          `                cssClasses: ['${config.component}', 'component', StyleSystem, Grid],`
        );
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
      fileContents.push(`        styleSystem={StyleSystem()}`);
      fileContents.push(`        grid={Grid()}`);
      fileContents.push(`        classes="${config.component}"`);
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
      `Created or Updated ${config.componentType}/${config.component}/${config.component}.stories.js`
    );
  });

  log(`Story file created for the ${config.component}`);
  log(`Story file -> ${storyPath}`);
};
