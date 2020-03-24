import * as fs from 'fs';
import { log } from '../../../utils/logger';
import { toCamelCase } from '../../../utils/toCamelCase';

module.exports = config => {
  console.log('config:', config);
  console.log('config:', config.stories);
  const componentPath = `${config.componentPath}/${config.component}`;
  let fileContents = `/**
  * Storybook content for the ${config.component} component that can be POSTed in AEM JCR via SlingPostServlet.
  * Use the 'sb-aem content' command to POST to AEM - obviously AEM Must be running for this to work.
  * 
  * In order to see a complete example of the JSON signature, follow these steps:
  *   1. Author every value possible for the componen in question using AEM author
  *   2. Copy the path to the page - e.g. /content/we-retail/us/en
  *   3. Then open your page in crx/de: http://localhost:4502/crx/de/index.jsp#/content/we-retail/us/en
  *   4. Expand the jcr:content node and keep digging until you see your component
  *   5. Copy the absolute path to your component - e.g. /content/we-retail/us/en/jcr:content/root/responsivegrid/list
  *   6. View the infinity.json - http://localhost:4502/content/we-retail/us/en/jcr:content/root/responsivegrid/list.infinity.json
  *   7. Here you can see the complete JSON signature of the component, use this as a reference to fill out your content objects below
  */\n\n`;

  fileContents += `module.exports = {`;
  fileContents += `
    empty: {
        "jcr:primaryType":"nt:unstructured",
        "sling:resourceType":"${config.namespace}/components/content/${config.component}"
    }`;

  if (typeof config.stories === 'string') {
    if (config.stories.indexOf(',') !== -1) config.stories = config.stories.split(',');
    else config.stories = [config.stories];
  }

  config.stories.forEach(story => {
    const storyName = toCamelCase(story);
    fileContents += `,
    ${storyName}: {
        "jcr:primaryType":"nt:unstructured",
        "sling:resourceType":"${config.namespace}/components/content/${config.component}"
    }`;
  });

  fileContents += '\n};';

  fs.writeFile(`${componentPath}/${config.component}.content.js`, fileContents, err => {
    if (err) throw err;
    log(`Created ${componentPath}/${config.component}.stories.js`);
  });
};
