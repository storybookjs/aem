/**
 * Generic model implementation that either instantiates a use-class or mocks a Sling Model class.
 */
class GenericModel {
  constructor(id) {
    this.id = id;
  }

  async use(context) {
    console.log(context);
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
      // todo: resolve path in content
      if (content) {
        return content;
      } else {
        throw Error(`no model for ${this.id} and no content defined.`);
      }
    }
  }
}

export function modelProxy(id) {
  return new Proxy(GenericModel, {
    construct(target, argArray, newTarget) {
      return new target(id);
    }
  });
}
