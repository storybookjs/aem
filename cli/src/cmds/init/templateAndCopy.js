const fs = require('fs');
const ncp = require('ncp').ncp;
const source = `${__dirname}/../../../storybook/.storybook`;
const log = require('../../utils/logger');

module.exports = config => {
    ncp.limit = 16;

    log(`Copying storybook files to ${config.uiApps}/.storybook`);

    let fileContents = `import React from 'react';
import { addParameters, addDecorator, configure } from '@storybook/${config.jsFramework}';
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
    require(`${config.storybookStoryLocation}../src/main/content/jcr_root/apps/uhcdotcom/components/designs/welcome.stories.js`),
    require(`${config.storybookStoryLocation}../src/main/content/jcr_root/apps/uhcdotcom/components/designs/typography.stories.js`),
    require(`${config.storybookStoryLocation}../src/main/content/jcr_root/apps/uhcdotcom/components/designs/colors.stories.js`)
];

const loaderFn = () => {
    const req = require.context(
        '${config.storybookStoryLocation}',
        true,
        /.stories.js$/
    );
    req.keys().forEach(story => storyConfig.push(req(story)));
    return storyConfig;
};

configure(loaderFn, module);`;

    ncp(source, `${config.uiApps}/.storybook`, (err) => {
        if (err) return console.error(err);
        log(`Storybook Files Copied to ui.apps folder: ${config.uiApps}/.storybook`);

        fs.writeFile(`${config.uiApps}/.storybook/config.js`, fileContents, (err) => {
            if (err) throw err;
            log(`Created ${config.uiApps}/.storybook/config.js`);
        });
    });
    
}
