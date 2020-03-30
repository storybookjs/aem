/* eslint-disable valid-typeof */
// We need the default as Runtime,
// or else the Runtime class doesn't get properly resolved
/* eslint-disable import/no-named-default */
import { default as Runtime, VDOMFactory } from '@adobe/htlengine/src/runtime/Runtime';
import { document, Node, window } from 'global';
import { RenderMainArgs, ShowErrorArgs, DecorationTag, AemMetadata } from './types/types';
import ComponentLoader from './helpers/ComponentLoader';
import ResourceResolver from './helpers/ResourceResolver';
import { simulatePageLoad } from './helpers/simulate-pageload';

const DIV_TAG = 'div';
const TYPE_STRING = 'string';
const TYPE_FUNCTION = 'function';
const PROPERTY_TAG_NAME = 'tagName';
const PROPERTY_CSS_CLASSES = 'cssClasses';
const ATTRIBUTE_CLASS = 'class';
const ROOT_ELEMENT = document.getElementById('root');

/**
 * Gets the runtime object with all params set
 */
const createRuntime = (
  wcmmode: any,
  content: Record<string, any>,
  resourceLoaderPath: string,
  aemMetadata: AemMetadata
) => {
  const models: Record<string, any> = aemMetadata ? aemMetadata.models : {};
  const components: any[] = aemMetadata ? aemMetadata.components : [];
  return new Runtime()
    .setGlobal({ models, wcmmode, component: { properties: {} }, content })
    .withDomFactory(new VDOMFactory(window.document.implementation).withKeepFragment(true))
    .withResourceLoader(
      new ResourceResolver(content || {}, new ComponentLoader(), components).createResourceLoader(
        resourceLoaderPath || '/'
      )
    );
};

/**
 * Gets a generic error message that takes in story information for detailing
 * @param selectedStory
 * @param selectedKind
 */
const getErrorMessage = (selectedStory: string, selectedKind: string): ShowErrorArgs => {
  return {
    title: `Expecting an HTL snippet or DOM node from the story: "${selectedStory}" of "${selectedKind}".`,
    description: `Did you forget to return the HTL snippet from the story in the template parameter?\n 
                  Use "template: <your snippet, node, or template>" or when defining the story.`,
  };
};

/**
 * Function that creates and returns a decoration element based on the decration tag data provided
 * @param decorationTag
 * @param element
 */
const getDecorationElement = (decorationTag: DecorationTag, element: Element) => {
  let decorationElement;
  if (decorationTag) {
    const decorationElementType = Object.prototype.hasOwnProperty.call(
      decorationTag,
      PROPERTY_TAG_NAME
    )
      ? decorationTag.tagName
      : DIV_TAG;
    const decorationElementClass = Object.prototype.hasOwnProperty.call(
      decorationTag,
      PROPERTY_CSS_CLASSES
    )
      ? decorationTag.cssClasses
          .map((value: any) => {
            return typeof value === 'function' ? value() : value;
          })
          .join(' ')
      : 'component';
    decorationElement = document.createElement(decorationElementType);
    decorationElement.setAttribute(ATTRIBUTE_CLASS, decorationElementClass);

    // eslint-disable-next-line no-unused-expressions
    typeof element === TYPE_STRING
      ? (decorationElement.innerHTML = element)
      : decorationElement.appendChild(element);
  }
  return decorationElement;
};

/**
 * Function that checks if the renderer should remount the component
 * @param forceRender
 * @param element
 * @param decorationElement
 */
const shouldRemount = (forceRender: boolean, element: Element, decorationElement: Element) => {
  return !(
    forceRender === true &&
    ((typeof element === TYPE_STRING && ROOT_ELEMENT.innerHTML === element) ||
      (element &&
        element.outerHTML &&
        ROOT_ELEMENT.firstChild &&
        (ROOT_ELEMENT.firstChild.outerHTML === element.outerHTML ||
          (decorationElement &&
            ROOT_ELEMENT.firstChild.outerHTML === decorationElement.outerHTML))))
  );
};

/**
 * Resets the root dom to an empty state
 */
const resetRoot = () => {
  ROOT_ELEMENT.innerHTML = '';
};

/**
 * Gets The HTL template
 * @param storyFn
 * @param resourceType
 * @param components
 */
const getTemplate = async (storyFn: any, resourceType: any, aemMetadata: AemMetadata) => {
  const { template } = (await storyFn()) as any;
  const components: any[] = aemMetadata ? aemMetadata.components : [];
  let info = resourceType ? new ComponentLoader().resolve(resourceType, components) : null;
  info = info && info.module ? info.module : `unable to load ${resourceType}`;
  return !template ? info : template;
};

export default async function renderMain({
  storyFn,
  selectedKind,
  selectedStory,
  showMain,
  showError,
  forceRender,
}: RenderMainArgs) {
  const {
    resourceLoaderPath,
    resourceType,
    content,
    aemMetadata = {},
    wcmmode = {},
  } = (await storyFn()) as any;
  const runtime: any = await createRuntime(wcmmode, content, resourceLoaderPath, aemMetadata);
  const template: any = await getTemplate(storyFn, resourceType, aemMetadata);
  const element: any = typeof template === TYPE_FUNCTION ? await template(runtime) : template;
  const decorationTag: DecorationTag = aemMetadata ? aemMetadata.decorationTag : null;

  showMain();

  if ((ROOT_ELEMENT && element instanceof Node !== false) || typeof element === TYPE_STRING) {
    // Build the decoration tag so we can check it to prevent unnecessary rerenders
    const decorationElement = getDecorationElement(decorationTag, element);
    // Don't re-mount the element if it didn't change and neither did the story
    if (shouldRemount(forceRender, element, decorationElement)) {
      resetRoot();
      if (decorationTag) {
        ROOT_ELEMENT.appendChild(decorationElement);
      } else {
        // eslint-disable-next-line no-unused-expressions
        typeof element === TYPE_STRING
          ? (ROOT_ELEMENT.innerHTML = element)
          : ROOT_ELEMENT.appendChild(element);
      }

      simulatePageLoad(ROOT_ELEMENT);
    }
  } else {
    showError(getErrorMessage(selectedKind, selectedStory));
  }
}
