import fs from 'fs';
import path from 'path';
import npm from 'npm';
import ncp from 'ncp';
import { log, getPackageJSON } from '../../utils';

const cwd = process.cwd();

export default async answers => {
  const packageJSONPath = path.resolve(cwd, 'package.json');
  const packageJSON = getPackageJSON(packageJSONPath);

  packageJSON['@storybook/aem-cli'] = answers;
  packageJSON.scripts.storybook = 'start-storybook -p 4501';

  fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));

  /*
    if (answers.storybookLocation) {

        let storybookDirectory = path.resolve(cwd, answers.projectRoot, answers.relativeProjectRoot, answers.storybookLocation);
        if (!fs.existsSync(storybookDirectory)){
            fs.mkdirSync(storybookDirectory);
        }
        let defaultStoriesDirectory = path.resolve(cwd, answers.projectRoot, answers.relativeProjectRoot, answers.componentPath, 'designs');
        if (!fs.existsSync(defaultStoriesDirectory)){
            fs.mkdirSync(defaultStoriesDirectory);
        }

let configContents = `import React from 'react';
import { addParameters, addDecorator, configure } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withDesign } from 'storybook-addon-designs';
import withPageTemplate, { AEMGrid, Centered } from 'storybook-aem-page-template';

import theme from './theme';

addDecorator(withA11y);
addDecorator(withPageTemplate);
addDecorator(withDesign);
addParameters({
    options: {
        theme: theme
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS
    },
    docs: {
        container: DocsContainer,
        page: DocsPage
    },
    pageTemplate: {
        defaultTemplate: 'AEM Grid',
        templates: [
            {
                label: 'AEM Grid',
                template: AEMGrid
            },

            {
                label: 'Centered',
                template: Centered
            }
        ]
    }
});

const storyConfig = [
    require('${answers.storybookStoryLocation}/designs/welcome.stories.js'),
    require('${answers.storybookStoryLocation}/designs/typography.stories.js'),
    require('${answers.storybookStoryLocation}/designs/colors.stories.js')
];

const loaderFn = () => {
    const req = require.context(
        '${answers.storybookStoryLocation}',
        true,
        /.stories.js$/
    );
    req.keys().forEach(story => storyConfig.push(req(story)));
    return storyConfig;
};

configure(loaderFn, module);`;

let previewHeadContents = false;
if (answers.clientlibs) {
    previewHeadContents = ``;
    answers.clientlibs.forEach( clientlib => {
        previewHeadContents += `<script type="text/javascript" src="http://localhost:4502${clientlib.aemPath}.js"></script>\n`;
        previewHeadContents += `<link rel="stylesheet" href="http://localhost:4502${clientlib.aemPath}.css" type="text/css">\n`;
    });
}

        ncp(path.resolve(__dirname,'../../../storybook/'), storybookDirectory, (err) => {
            if (err) return console.error(err);
            log(`Storybook Files Copied to ui.apps folder: ${answers.uiApps}/.storybook`);

            fs.writeFile(`${storybookDirectory}/config.js`, configContents, (err) => {
                if (err) throw err;
                log(`Created ${storybookDirectory}/config.js`);
            });
            if (previewHeadContents) {
                fs.writeFile(`${storybookDirectory}/preview-head.html`, previewHeadContents, (err) => {
                    if (err) throw err;
                    log(`Created ${storybookDirectory}/config.js`);
                });
            }
        });

        ncp(path.resolve(__dirname,'../../../designs/'), defaultStoriesDirectory, (err) => {
            if (err) return console.error(err);
            log(`Storybook Default Stories copies to components folder: ${answers.componentPath}/designs/`);
        });

        let packages = [
            `webpack`,
            `webpack-cli`,
            `babel-loader`,
            `@babel/plugin-transform-react-jsx`,
            `@storybook/react`,
            '@storybook/addon-a11y',
            '@storybook/addon-backgrounds',
            '@storybook/addon-docs',
            '@storybook/addon-knobs',
            '@storybook/addon-storysource',
            '@storybook/addon-viewport',
            '@storybook/html',
            '@storybook/theming',
            'storybook-addon-designs',
            'http-proxy-middleware',
            'storybook-aem-grid',
            'storybook-aem-style-system',
            'storybook-aem-page-template',
            'storybook-aem-wrappers',
            'react',
        ];

        // Currently unsupported because of reasons
        // if (answers.jsFramework === 'preact') {
        //     packages.push('preact');
        //     packages.push('preact-compat');
        //     packages.push('@babel/core');
        // }
        if (answers.jsFramework === 'react') {
            packages.push('react');
        }

        if (answers.cssPreProcessor === 'sass') {
            packages.push('style-loader');
            packages.push('css-loader');
            packages.push('sass-loader');
        }

        npm.load({ loaded: false }, (err) => {
            if (err) throw err;

            log('Installing Storybook dependencies');
            npm.commands.install(packages, (installError, data) => {
                if (installError) throw installError;
            });

            npm.on('log', (message) => console.log(message));
            log('When installation is complete, run `npm run storybook` to start storybook on port 4501');
        });
    }

    */

  return answers;
};
