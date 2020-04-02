import { basename, relative, sep as pathSeparator } from 'path';
import { toJson } from 'xml2json';
import { existsSync } from 'fs';

const txtLoader = require.resolve('./aem-clientlib-txt-loader.js');

const KEY_JCR_ROOT = 'jcr:root';
const KEY_JCR_TITLE = 'jcr:title';
const NAME_JCR_ROOT = 'jcr_root';

const NAME_APPS = 'apps';
const NAME_LIBS = 'libs';
const NAME_NODE_MODULES = 'node_modules';

const getRequiredHTL = (logger, component, context, pathBaseName) => {
  const htlFile = `${context}/${pathBaseName}.html`;
  if (!existsSync(htlFile)) {
    logger.info(`No HTL script for ${pathBaseName}`);
    return '';
  }
  return `component.module = require('${htlFile}');`;
};

const getRequiredClientLibs = componentDir => {
  // Generate the code to load and watch all
  // js.txt or css.txt files
  const loadClientLibCode = !componentDir
    ? ''
    : `
    var txtFileLoadContext = require.context(
      '!!${txtLoader}!${componentDir}/', 
      /* include subdirectories: */ 
      true, 
      /* all js.txt and css.txt files */
      /(^|\\/)(js|css).txt$/
    );
    // Execute all files
    txtFileLoadContext.keys().forEach(txtFileLoadContext);
  `;
  return loadClientLibCode;
};

/**
 * Computes the resource type given the webpack context and root-context.
 * This is based on heuristic and best practices. It would be better if
 * the respective roots could be specified via configuration.
 *
 * @param {string} rootContext compilation context (i.e. the directory of the compilation)
 * @param {string} context compile context (i.e. the directory of the .content.xml)
 * @returns {string} The resource type.
 */
const getResourceType = (rootContext, context) => {
  const segs = relative(rootContext, context).split(pathSeparator);
  // if component is in different module, it will be below a node_modules
  let idx = segs.indexOf(NAME_NODE_MODULES);
  if (idx >= 0) {
    // remove all segments including node_modules
    segs.splice(0, idx + 1);
  }
  // if component is below a jcr_root
  idx = segs.indexOf(NAME_JCR_ROOT);
  if (idx >= 0) {
    // remove all segments including jcr_root
    segs.splice(0, idx + 1);
    if (segs[0] === NAME_APPS || segs[1] === NAME_LIBS) {
      segs.splice(0, 1);
    }
  }
  return segs.join('/');
};

export default async function aemComponentLoader(source) {
  const { context, rootContext } = this;
  const logger = this.getLogger();
  const componentData = JSON.parse(toJson(source));
  const pathBaseName = basename(context);
  const component = {
    resourceType: getResourceType(rootContext, context),
    properties: componentData[KEY_JCR_ROOT] || {},
  };
  if (!component.properties[KEY_JCR_TITLE]) {
    component.properties[KEY_JCR_TITLE] = pathBaseName;
  }

  return [
    `var component = ${JSON.stringify(component)};`,
    'module.exports = component;',
    getRequiredClientLibs(context),
    getRequiredHTL(logger, component, context, pathBaseName),
  ].join('\n');
}
