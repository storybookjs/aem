import * as Runtime from '@adobe/htlengine/src/runtime/Runtime';

export default class ResourceResolver {
  content = null;
  loader = null;

  constructor(content, componentLoader) {
    this.content = content;
    this.loader = componentLoader;
  }

  createResourceLoader(parentPath) {
    if (!Array.isArray(parentPath)) {
      parentPath = parentPath.split('/').filter((s) => !!s);
    }
    return async (runtime, uri) => {
      console.log('loading', uri);
      let path = uri.split('/');
      if (!uri.startsWith('/')) {
        path = parentPath.concat(uri.split('/'));
      }
      path = path.filter((s) => !!s);
      // todo: implement relative path...
      let c = this.content;
      let i = 0;
      while (c && i < path.length && c[':items']) {
        c = c[':items'][path[i++]];
      }
      if (!c) {
        // todo: remove debug
        return `no such resource: ${uri}...`;
      }

      // try to get component
      const type = c[':type'];
      const comp = this.loader.resolve(type);
      if (!comp) {
        // todo: remove debug
        return `no such component: ${type}`;
      }
      // create a new runtime for this component
      const localRuntime = new Runtime()
        .withResourceLoader(this.createResourceLoader(path))
        .withDomFactory(new Runtime.VDOMFactory(window.document.implementation))
        .setGlobal({
          ...runtime._globals,
          component: {
            properties: comp.properties,
          },
          content: c,
        });
      return comp.module(localRuntime);
    }
  }
}
