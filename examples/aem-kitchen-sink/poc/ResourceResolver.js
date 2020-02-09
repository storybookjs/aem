/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Adobe
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import Runtime from './BrowserRuntime';

export default class ResourceResolver {

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
        .setGlobal({
          ...runtime._globals,
          component: {
            properties: {
              // todo: read from .content.xml
              'jcr:title': `component ${type}`
            }
          },
          content: c,
        });
      return comp(localRuntime);
    }
  }
}
