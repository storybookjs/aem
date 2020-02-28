import { document, Node } from 'global';
import { RenderMainArgs } from './types';
import * as Runtime from '@adobe/htlengine/src/runtime/Runtime';
import ComponentLoader from './helpers/ComponentLoader';
import ResourceResolver from './helpers/ResourceResolver';

const rootElement = document.getElementById('root');

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
  const storyObj = storyFn() as any;
  const { resourceLoaderPath, template, props, content, wcmmode = {}, decorationTag = {} } = storyObj;
  const hasDecorationTag = decorationTag !== null;
  let decorationElement;
  const runtime = new Runtime();
  runtime.setGlobal({
    wcmmode: wcmmode,
    component: {
      properties: props
    },
    content: content,
  });
  runtime.withDomFactory(new Runtime.VDOMFactory(window.document.implementation).withKeepFragment(true));
  if(resourceLoaderPath && content) {
    const resolver = new ResourceResolver(content, new ComponentLoader());
    runtime.withResourceLoader(resolver.createResourceLoader(resourceLoaderPath));
  }

  showMain();
  
  // todo: runtime globals are not available in templates
  // see https://github.com/adobe/htlengine/issues/133
  Object.entries(runtime.globals).forEach(([key, value]) => {
    (global as any)[key] = value;
  });

  let element = typeof template === 'function' ? await template(runtime) : template;

  if (element instanceof Node === false && typeof element !== 'string') {
    showError(errorMessage);
  } else {

    // Build the decoration tag so we can check it to prevent unnecessary rerenders
    if (hasDecorationTag) {
      const decorationElementType = decorationTag.hasOwnProperty('tagName') ? decorationTag.tagName : 'div';
      const decorationElementClass = decorationTag.hasOwnProperty('cssClasses') ? decorationTag.cssClasses.join(' ') : 'component';
      
      decorationElement = document.createElement(decorationElementType);
      decorationElement.setAttribute('class',decorationElementClass);
      
      if (typeof element === 'string') {
        decorationElement.innerHTML = element;
      } else if (element instanceof Node) {
        decorationElement.appendChild(element);
      }
    }

    // Don't re-mount the element if it didn't change and neither did the story
    if (forceRender === true && 
      (
        (typeof element === 'string' && rootElement.innerHTML === element) ||
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

      if (hasDecorationTag) {
        rootElement.appendChild(decorationElement);
      } else {
        if (typeof element === 'string') {
          rootElement.innerHTML = element;
        } else if (element instanceof Node) {
          rootElement.appendChild(element);
        }
      }
    }
  }
}
