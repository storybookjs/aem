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
      // file should be item.htl
      // file ends up come back as components/accordion/item.htl

      // check if the file is in the object, but then also check if a key exists with the component name as well
      const action = file.includes("\\") ? this.includes[file.replace(/\\/g, "/")] : this.includes[file];
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
