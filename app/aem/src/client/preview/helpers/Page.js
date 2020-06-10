/**
 * Simple AEM page implementation
 */
export default class Page {
  constructor(path = '', node = {}, repo) {
    this.path = path;
    this.node = node;
    this.content = node['jcr:content'] || {};
    this.repo = repo || node;
    this._path = path.split('/').filter((s) => s);
  }

  getDepth() {
    return this._path.length;
  }

  getAbsoluteParent(level) {
    let node = this.repo;
    let idx = 0;
    let path = '';
    while (idx < level && node) {
      const seg = this._path[idx++];
      node = node[seg];
      path += `/${seg}`
    }
    return node ? new Page(path, node, this.repo) : null;
  }

  equals(other) {
    return this.path === other.path;
  }

  isHideInNav() {
    return !!this.content.hideInNav;
  }
}
