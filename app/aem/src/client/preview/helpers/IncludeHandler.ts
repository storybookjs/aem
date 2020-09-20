/* eslint-disable import/no-named-default */
import { default as Runtime, VDOMFactory } from '@adobe/htlengine/src/runtime/Runtime';
import { window } from 'global';

export default class IncludeHandler {
  includes = null;

  constructor(includes) {
    this.includes = includes;
  }

  createIncludeHandler() {
    return (runtime, file: string, options: any) => {
      console.log("file!!!",file)
      const action = this.includes[file];
      if (!action) {
        return `No such script: ${file}.`;
      }
      // create a new runtime for this include
      const localRuntime = new Runtime()
        .withResourceLoader(runtime._resourceLoader)
        .withDomFactory(new VDOMFactory(window.document.implementation))
        .setGlobal({
          ...runtime.globals,
          ...options,
        });
      return action(localRuntime);
    }
  }
}
