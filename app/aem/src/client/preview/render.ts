import { document, Node } from 'global';
import dedent from 'ts-dedent';
import { RenderMainArgs } from './types/types';
import * as Runtime from '@adobe/htlengine/src/runtime/Runtime';
import ComponentLoader from './helpers/ComponentLoader';
import ResourceResolver from './helpers/ResourceResolver';

const rootElement = document.getElementById('root');

/**
 * Gets the runtime object with all params set
 */
const getRuntime = (wcmmode, props, content, resourceLoaderPath, compLoader, componentIncludes) => {
  const resolver = new ResourceResolver(content || {}, compLoader, componentIncludes);
  const runtime = new Runtime();
  runtime.setGlobal({
    wcmmode: wcmmode,
    component: {
      properties: props
    },
    content: content,
  });
  runtime.withDomFactory(new Runtime.VDOMFactory(window.document.implementation).withKeepFragment(true));
  runtime.withResourceLoader(resolver.createResourceLoader(resourceLoaderPath || '/'));
  return runtime;
}

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
    description: dedent`
      Did you forget to return the HTML snippet from the story in the template parameter?
      Use "template: <your snippet, node, or template>" or when defining the story.
    `,
  };
  const storyObj = storyFn() as any;
  const { resourceLoaderPath, resourceType, props, content, aemMetadata = {}, wcmmode = {} } = storyObj;
  let { template } = storyObj;
  const compLoader = new ComponentLoader();
  
  const componentIncludes = aemMetadata.componentIncludes;
  const decorationElementType = aemMetadata.decorationTag && aemMetadata.decorationTag.hasOwnProperty('tagName') ? aemMetadata.decorationTag.tagName : 'div';
  const decorationElementClass = aemMetadata.decorationTag && aemMetadata.decorationTag.hasOwnProperty('cssClasses') ? aemMetadata.decorationTag.cssClasses.join(' ') : 'component';
  const decorationElement = document.createElement(decorationElementType);
  decorationElement.setAttribute('class',decorationElementClass);

  showMain();

  if (!template && resourceType) {
    const info = compLoader.resolve(resourceType, aemMetadata ? componentIncludes : []);
    if (!info) {
      template = `unable to load ${resourceType}`;
    } else {
      template = info.module;
    }
  }

  if (typeof template === 'string') {
    if (!decorationElement) {
      rootElement.innerHTML = template;
    } else {
      rootElement.innerHTML = '';
      decorationElement.innerHTML = template;
      rootElement.appendChild(decorationElement);
    }
  } else if (typeof template === 'function') {
    const runtime = getRuntime(wcmmode, props, content, resourceLoaderPath, compLoader, componentIncludes);
    const element = await template(runtime);
    if (element instanceof Node !== true) {
      showError(errorMessage);
    } else {
      // Don't re-mount the element if it didn't change and neither did the story
      if (forceRender === true &&
        (rootElement.firstChild === element ||
        (decorationElement && rootElement.firstChild === decorationElement && decorationElement.firstChild === element) ) ) {
        return;
      }

      rootElement.innerHTML = '';
      if (aemMetadata && aemMetadata.decorationTag === null) {
        rootElement.appendChild(element);
      } else if (decorationElement) {
        decorationElement.appendChild(element);
        rootElement.appendChild(decorationElement);
      }
    }
  } else {
    showError(errorMessage);
  }
}
