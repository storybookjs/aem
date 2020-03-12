import { document, Node } from 'global';
import { RenderMainArgs } from './types/types';
import * as Runtime from '@adobe/htlengine/src/runtime/Runtime';
import ComponentLoader from './helpers/ComponentLoader';
import ResourceResolver from './helpers/ResourceResolver';

const DIV_TAG = 'div';
const TYPE_STRING = 'string';
const TYPE_FUNCTION = 'function';
const PROPERTY_TAG_NAME = 'tagName';
const PROPERTY_CSS_CLASSES = 'cssClasses';
const ATTRIBUTE_CLASS = 'class';
const rootElement = document.getElementById('root');


/**
 * Gets the runtime object with all params set
 */
const createRuntime = (wcmmode, content, resourceLoaderPath, compLoader, components, models) => {
  const resolver = new ResourceResolver(content || {}, compLoader, components);
  const runtime = new Runtime();
  runtime.setGlobal({
    models,
    wcmmode,
    component: {
      properties: {}
    },
    content,
  });
  runtime.withDomFactory(new Runtime.VDOMFactory(window.document.implementation).withKeepFragment(true));
  runtime.withResourceLoader(resolver.createResourceLoader(resourceLoaderPath || '/'));
  return runtime;
};

export default async function renderMain({
  storyFn,
  selectedKind,
  selectedStory,
  showMain,
  showError,
  forceRender,
}: RenderMainArgs) {
  const errorMessage = {
    title: `Expecting an HTML snippet or DOM node from the story: "${selectedStory}" of "${selectedKind}".`,
    description: [
      `Did you forget to return the HTML snippet from the story in the template parameter?`,
      `Use "template: <your snippet, node, or template>" or when defining the story.`
    ].join('\n'),
  };

  const { resourceLoaderPath, resourceType, content, aemMetadata = {}, wcmmode = {}, models = {} } = storyFn() as any;
  const decorationTag = aemMetadata ? aemMetadata.decorationTag : null;
  const components = aemMetadata ? aemMetadata.components : [];
  const compLoader = new ComponentLoader();
  let { template } = storyFn() as any;

  showMain();

  if (!template && resourceType) {
    const info = compLoader.resolve(resourceType, components);
    if (!info) {
      template = `unable to load ${resourceType}`;
    } else {
      template = info.module;
    }
  }
  const runtime = createRuntime(wcmmode, content, resourceLoaderPath, compLoader, components, models);
  let element = typeof template === TYPE_FUNCTION ? await template(runtime) : template;

  if (element instanceof Node === false && typeof element !== TYPE_STRING) {
    showError(errorMessage);
  } else {
    let decorationElement;
    // Build the decoration tag so we can check it to prevent unnecessary rerenders
    if (decorationTag) {
      const decorationElementType = decorationTag.hasOwnProperty(PROPERTY_TAG_NAME) ? decorationTag.tagName : DIV_TAG;
      const decorationElementClass = decorationTag.hasOwnProperty(PROPERTY_CSS_CLASSES) ? decorationTag.cssClasses.join(' ') : 'component';

      decorationElement = document.createElement(decorationElementType);
      decorationElement.setAttribute(ATTRIBUTE_CLASS,decorationElementClass);

      if (typeof element === TYPE_STRING) {
        decorationElement.innerHTML = element;
      } else {
        decorationElement.appendChild(element);

      }
    }
    if(!rootElement) return;
    // Don't re-mount the element if it didn't change and neither did the story
    if (forceRender === true &&
      (
        (typeof element === TYPE_STRING && rootElement.innerHTML === element) ||
        ((element && element.outerHTML && rootElement.firstChild) &&
          (rootElement.firstChild.outerHTML === element.outerHTML ||
          decorationElement && rootElement.firstChild.outerHTML === decorationElement.outerHTML)
        )
      )
    ) {
      return;
    // Render
    } else {
      rootElement.innerHTML = '';

      if (decorationTag) {
        rootElement.appendChild(decorationElement);
      } else {
        if (typeof element === TYPE_STRING) {
          rootElement.innerHTML = element;
        } else {
          rootElement.appendChild(element);
        }
      }
    }
  }
}
