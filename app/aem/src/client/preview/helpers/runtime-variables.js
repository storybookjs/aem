import Page from './Page';

/**
 * Simple proxy that resolves any property.
 */
function nopProxy() {
  return new Proxy(
    {},
    {
      get(target, prop) {
        return `${prop}() not implemented.`;
      },
    }
  );
}

/**
 * HTL runtime global variables.
 * @see https://sling.apache.org/documentation/bundles/scripting/scripting-htl.html#global-objects
 * @see https://docs.adobe.com/content/help/en/experience-manager-htl/using/htl/global-objects.html
 */
export default (path, content) => {
  const currentPage = new Page(path, content);
  return {
    component: { properties: {} },
    properties: {},
    componentContext: nopProxy(),
    currentDesign: nopProxy(),
    currentNode: nopProxy(),
    currentPage,
    currentSession: nopProxy(),
    currentStyle: nopProxy(),
    designer: nopProxy(),
    editContext: nopProxy(),
    inheritedPageProperties: nopProxy(),
    log: console,
    out: nopProxy(),
    pageManager: nopProxy(),
    pageProperties: nopProxy(),
    reader: nopProxy(),
    request: nopProxy(),
    resolver: nopProxy(),
    resource: nopProxy(),
    resourceDesign: nopProxy(),
    resourcePage: nopProxy(),
    response: nopProxy(),
    sling: nopProxy(),
    slyWcmHelper: nopProxy(),
    wcmmode: {},
    xssAPI: nopProxy(),
  }
};
