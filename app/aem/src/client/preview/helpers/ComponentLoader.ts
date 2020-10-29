export default class ComponentLoader {
  private components: any;

  constructor(components: any) {
    this.components = components.map(component => {
      if (component.hasOwnProperty('resourceType') && component.resourceType.includes('..')) {
        if (component.resourceType.includes('apps/')) {
          component.resourceType = component.resourceType.split('apps/')[1];
        }
      }
      return component;

    }) || [];
    window.AEMComponentList = this.components;
  }

  /**
   * Resolves the component for the given resource type.
   * @param {string} type Resource type
   * @return {object} component info or {@code null}.
   */
  resolve(type: string): any {
    if (!type) {
      return null;
    }
    return this.components.find(c => c.resourceType === type || c.resourceType.endsWith(type));
  }

  /**
   * Resolves the HTL script for the given resource type, respecting the `sling:resourceSuperType`
   * property.
   *
   * @param {string} type Resource Type.
   * @return {function} the script function or {@code null}
   */
  resolveScript(type: string): Function {
    console.log('Component Type:', type);
    const component = this.resolve(type);
    if (!component) {
      return null;
    }
    if (component.module) {
      return component.module;
    }
    console.log('Use Component superType:', component.properties['sling:resourceSuperType']);
    return this.resolveScript(component.properties['sling:resourceSuperType']);
  }
}
