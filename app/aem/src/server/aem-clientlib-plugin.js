export default class AemClientLibPlugin {
    constructor(options) {
      this.options = options;
    }
  
    apply(compiler) {
      compiler.hooks.done.tap('DemoPlugin', () => {
        console.log('\nHello world\n');
      });
    }
}