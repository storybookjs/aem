export default class ComponentLoader {
  resolve(type) {
    const comps = window.AEMComponents || [];
    return comps.find((c) => c.resourceType === type);
  }
}
