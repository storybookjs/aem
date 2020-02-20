import { document, Node } from 'global';
import dedent from 'ts-dedent';
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
  const storyObj = storyFn() as any;
  const { resourceLoaderPath, template, props, content, wcmmode = {} } = storyObj;
  const runtime = new Runtime();
  runtime.setGlobal({
    wcmmode: wcmmode,
    component: {
      properties: props
    },
    content: content,
  });
  runtime.withDomFactory(new Runtime.VDOMFactory(window.document.implementation));
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
  const element =  await template(runtime);
  console.log('made it again')

  if (typeof element === 'string') {
    rootElement.innerHTML = element;
  } else if (element instanceof Node) {
    // Don't re-mount the element if it didn't change and neither did the story
    if (rootElement.firstChild === element && forceRender === true) {
      return;
    }

    rootElement.innerHTML = '';
    rootElement.appendChild(element);
  } else {
    showError({
      title: `Expecting an HTML snippet or DOM node from the story: "${selectedStory}" of "${selectedKind}".`,
      description: dedent`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `,
    });
  }
}
