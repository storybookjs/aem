/**
 * Generic model implementation that mocks a Sling Model class.
 */
class GenericModel {
  constructor(modelClazz) {
    this.modelClazz = modelClazz;
  }

  async use(context) {
    const { content } = context;
    return new this.modelClazz(content);
  }
}

// todo: load automatically
const models = [
  require('../models/com.adobe.cq.wcm.core.components.models.Text').default,
  require('../models/com.adobe.cq.wcm.core.components.models.List').default,
  require('../models/com.adobe.cq.wcm.core.components.models.Accordion').default,
];

module.exports = (id) => {
  return new Proxy(GenericModel, {
    construct(target, argArray, newTarget) {
      const model = models.find((mod) => mod.clazz === id);
      if (!model) {
        throw Error(`no such model: ${id}`);
      }
      return new target(model);
    }
  });
};
