import { basename, relative, join, sep as pathSeparator } from 'path';
import { toJson } from 'xml2json';
import { existsSync, readFileSync } from 'fs';
const { getOptions } = require("loader-utils");

const txtLoader = require
  .resolve('./aem-clientlib-txt-loader.js')
  .split(pathSeparator)
  .join('/');

const KEY_JCR_ROOT = 'jcr:root';
const KEY_JCR_TITLE = 'jcr:title';
const NAME_JCR_ROOT = 'jcr_root';

const NAME_APPS = 'apps';
const NAME_LIBS = 'libs';
const NAME_NODE_MODULES = 'node_modules';
const DATA_SLY_INCLUDE_REGEX = /data-sly-include\s*="(.*?)"\s*/g;
const WITHIN_QUOTES_REGEX = /"(.*?)"/


const getRequiredHTL = (logger, component, context, pathBaseName, resolver) => {
  const htlFile = `${context.split(pathSeparator).join('/')}/${pathBaseName}.html`;
  if (!existsSync(`${htlFile}`)) {
    logger.info(`No HTL script for ${pathBaseName}`);
    return '';
  }

  const includes = getIncludes(htlFile, resolver, context);
  return `
  ${includes}
  component.module = require('${htlFile}');
  `;
};

const getIncludes = (path, resolver, context, pathBaseName) => {
  const data = readFileSync(path, 'utf8')
  let includes = ``;
  if(data) {
    const matches = data.match(DATA_SLY_INCLUDE_REGEX);
    if(matches) {
      for (let result of matches) {
        const includeValue = Array.from(result.match(WITHIN_QUOTES_REGEX))[0];
        const includeValueQuotesRemoved = includeValue.replace(/["']/g, "");
        const fullIncludePath = join(context, includeValueQuotesRemoved);
        includes = `
        ${includes}
        window.storybookAEMIncludes = Object.assign(window.storybookAEMIncludes ? window.storybookAEMIncludes : {}, {"${includeValueQuotesRemoved}": require('${fullIncludePath}')});
        console.log('INCLUDES', window.storybookAEMIncludes, "${includeValueQuotesRemoved}", '${fullIncludePath}')
        `
      }
    }
  }
  if(includes) {
    console.log(includes)
  }
  return includes;
}

const getRequiredClientLibs = componentDir => {
  // Generate the code to load and watch all
  // js.txt or css.txt files
  const loadClientLibCode = !componentDir
    ? ''
    : [
      `var txtFileLoadContext = require.context('!!${txtLoader}!${componentDir}/', true, /(^|\\/)(js|css).txt$/);`,
      `txtFileLoadContext.keys().forEach(txtFileLoadContext);`,
    ].join('\n');

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
  const options = getOptions(this);

  return [
    `var component = ${JSON.stringify(component)};`,
    'module.exports = component;',
    getRequiredClientLibs(context.split(pathSeparator).join('/')),
    getRequiredHTL(logger, component, context, pathBaseName, options.resolver),
  ].join('\n');
}
