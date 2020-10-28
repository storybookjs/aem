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
const WITHIN_DOUBLE_QUOTES_REGEX = /"(.*?)"/
const WITHIN_SINGLE_QUOTES_REGEX = /"(.*?)"/
const HTL_COMMENTS_REGEX = /(?<=\<\!\-\-\/\*\s*).*?(?=\s*\*\/\-\-\>)/gs;


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
    const data = readFileSync(path, 'utf8').replace(HTL_COMMENTS_REGEX, '');
    const htlEngineContext = context.includes(process.cwd()) ?
        context.split(`${process.cwd()}${pathSeparator}`)[1].replace(pathSeparator, '/') :
        context.split(pathSeparator).join('/');
    let includes = ``;
    if (data) {
        const matches = data.match(DATA_SLY_INCLUDE_REGEX);
        if (matches) {
            for (let result of matches) {

                const endResult = getIncludeValue(result)
                const fullIncludePath = join(context, endResult).split(pathSeparator).join('/');
                includes = `
        ${includes}
        window.storybookAEMIncludes = Object.assign(window.storybookAEMIncludes ? window.storybookAEMIncludes : {}, {"${htlEngineContext}/${endResult}": require('${fullIncludePath}')});
        `
            }
        }
    }

    return includes;
}


const getIncludeValue = (initialValue) => {
    const includeValue = Array.from(initialValue.match(WITHIN_DOUBLE_QUOTES_REGEX)) ? Array.from(initialValue.match(WITHIN_DOUBLE_QUOTES_REGEX))[0] : null;
    if (!includeValue) {
        return null;
    }

    // simple include - data-sly-include="test.htl"
    const includeValueQuotesRemoved = includeValue.replace(/["']/g, '');
    // result  = test.htl

    if (includeValueQuotesRemoved.indexOf('${') === -1) {
        return includeValueQuotesRemoved;
    }

    // include with string variable - data-sly-include="${'test.htl'}"
    const includeDollarBracesRemoved = includeValueQuotesRemoved.replace(/\${([^()]+)\}/, '');
    // result  = 'test.htl'

    // include with path manipulation - data-sly-include="${'test.htl' @ prependPath='project1'}" or , prependPath='project1'}"
    const prependPathValue = Array.from(includeDollarBracesRemoved.match(/(\@|,)(.)prependPath\=\'([^()]+)\'/))[0];
    // result project1

    // include with path manipulation - data-sly-include="${'project1' @ appendPath='test.htl'}" or , appendPath='test.htl'}"
    const appendPathValue = Array.from(includeDollarBracesRemoved.match(/(\@|,)(.)appendPath\=\'([^()]+)\'/))[0];
    // result test.htl

    // include with path manipulation - data-sly-include="${@ file='test.htl'}"
    const fileSetValue = Array.from(includeDollarBracesRemoved.match(/\@(.)file\=\'([^()]+)\'/))[0];
    if (fileSetValue) {
        if (includeDollarBracesRemoved.indexOf(',') === -1) {
            return fileSetValue;
        }
        return prependAppendValue(fileSetValue, prependPathValue, appendPathValue);
    }

    const firstValueWithinQuotes = includeDollarBracesRemoved.match(WITHIN_SINGLE_QUOTES_REGEX) ? includeDollarBracesRemoved.match(WITHIN_SINGLE_QUOTES_REGEX)[0] : null;
    if (firstValueWithinQuotes) {
        if (firstValueWithinQuotes.trim().legth + 2 === includeDollarBracesRemoved.length) {
            return firstValueWithinQuotes;
        }
        return prependAppendValue(firstValueWithinQuotes, prependPathValue, appendPathValue);
    }

    // include with request attributes - data-sly-include="${'test.htl' @ requestAttributes=settings}"

    // include with wcmmode - data-sly-include="${'test.htl' @ wcmmode='disabled'}"
    return null;
}

const prependAppendValue = (initialValue, prependValue, appendValue) => {
    prependValue = prependValue ? `${prependValue}${pathSeparator}` : '';
    appendValue = appendValue ? `${pathSeparator}${appendValue}` : '';
    return `${prependValue}${initialValue}${appendValue}`;
}



const getRequiredClientLibs = componentDir => {
    // Generate the code to load and watch all
    // js.txt or css.txt files
    const loadClientLibCode = !componentDir ?
        '' : [
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