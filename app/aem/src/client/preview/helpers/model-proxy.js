/**
 * HTL use class that instantiates the respective story model.
 */
class ModelProxy {
  constructor(id) {
    this.id = id;
  }

  /**
   * Called by the htlengine runtime when a script uses the data-sly-call plugin.
   * @param {object} context The runtime globals
   * @returns A use-class like instance or object.
   */
  async use(context) {
    const { content, models = {} } = context;
    let model = models[this.id];
    if (!model) {
      throw Error(`no such model: ${this.id}`);
    }
    if (model.default) {
      model = model.default;
    }
    // eslint-disable-next-line new-cap
    return new model(content, context);
  }
}

/**
 * A simple proxy that passes the respective Module id to the model proxy.
 * @param {string} id Module Id.
 * @returns {ModelProxy} A ModelProxy class.
 */
export function modelProxy(id) {
  return new Proxy(ModelProxy, {
    construct(target, argArray, newTarget) {
      // eslint-disable-next-line new-cap
      return new target(id);
    },
  });
}
