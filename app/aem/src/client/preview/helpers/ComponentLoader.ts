export default class ComponentLoader {
  resolve(type, resources) {
    const comps = resources || [];
    return comps.find((c) => c.resourceType === type);
  }
}
