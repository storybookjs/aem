/**
 * Generic model implementation that either instantiates a use-class or mocks a Sling Model class.
 */
class GenericModel {
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
    if (typeof model === 'function') {
      return new model(content);
    } else if (typeof model === 'object') {
      return model;
    } else if (typeof model === 'string') {
      if (!content) {
        throw Error(`no model for ${this.id} and no content defined.`);
      }
      const node = model.split('/').reduce((current, seg) => {
        if (!seg) {
          return current;
        }
        if (!current || !current[':items']) {
          return null;
        }
        return current[':items'][seg];
      }, content);
      if (!node) {
        throw Error(`no model for ${this.id} and node at path '${model}' does not exist in content.`);
      }
      return node;
    }
  }
}

/**
 * A simple proxy that passes the respective Module id to the generic model.
 * @param {string} id Module Id.
 * @returns {GenericModel} A proxied GenericModel class.
 */
export function modelProxy(id) {
  return new Proxy(GenericModel, {
    construct(target, argArray, newTarget) {
      return new target(id);
    }
  });
}
