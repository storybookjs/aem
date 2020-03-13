/**
 * Generic model implementation automatically exposes the properties and collections from the
 * underlying model content.
 */
export class GenericModel {
  constructor(content = {}) {
    this.content = content;
    const self = this;

    /**
     * Proxy handler for the abstract model. It assumes best practices when mapping the underlying
     * sling model to the potential use cases.
     */
    return new Proxy(this, {
      get(target, prop) {
        // property / getter / function of sub class has priority
        if (prop in self) {
          return self[prop];
        }
        if (prop in content) {
          return content[prop];
        }
        if (prop === 'items') {
          const items = content[':items'];
          if (!items) {
            return [];
          }
          const listItems = Object.entries(items).map(([name, item]) => new GenericModel({
            ':name': name,
            ...item,
          }));
          // hack to provide a size property of the expected java collection.
          listItems.size = listItems.length;
          return listItems;
        }
        if (prop === 'name') {
          return content[':name'];
        }
        if (prop === 'path') {
          return content[':path'];
        }
        return undefined;
      },
      has(target, key) {
        return key in content
          || key in self
          || key === 'items'
          || key === 'name'
          || key === 'path'
      },
    });
  }
}
