export default class AemClientLibPlugin {
    constructor(options) {
      this.options = options;
    }
  
    apply(compiler) {
      compiler.hooks.done.tap('AemClientLibPlugin', () => {
        // get paths to all content.xml files that are already trying to be loaded
        // iterate over those paths to determine if there is js directory
        // if there is a js directory, dynamically include chunk with name of tag in content.xml
      });
    }
}
