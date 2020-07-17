import NavigationItem from './NavigationItem';

/**
 * Defines the {@code Breadcrumb} Sling Model used for the {@code /apps/core/wcm/components/breadcrumb} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 11.0.0
 */
export default class Breadcrumb {

  /**
   * Name of the resource property that will indicate if pages that are hidden for navigation will still be displayed.
   *
   * @since com.adobe.cq.wcm.core.components.models 11.1.0
   */
  static PN_SHOW_HIDDEN = "showHidden";

  /**
   * Name of the resource property that will indicate if the current page should not be present in the collection returned by
   * {@link #getItems()}.
   *
   * @since com.adobe.cq.wcm.core.components.models 11.1.0
   */
  static PN_HIDE_CURRENT = "hideCurrent";

  /**
   * Name of the resource property that will indicate from which level starting from the current page the items from the collection
   * returned by {@link #getItems()} will be accumulated.
   *
   * @since com.adobe.cq.wcm.core.components.models 11.1.0
   */
  static PN_START_LEVEL = "startLevel";

  constructor(content, context) {
    this.content = content;
    this.context = context;
    this.startLevel = content[Breadcrumb.PN_START_LEVEL] || 0;
    this.showHidden = content[Breadcrumb.PN_SHOW_HIDDEN] || false;
    this.hideCurrent = content[Breadcrumb.PN_HIDE_CURRENT] || false;
  }

  /**
   * Creates collection of pages(from site hierarchy of current page) for the breadcrumb component
   *
   * @return {@link Collection} of breadcrumb items
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get items() {
    const { currentPage } = this.context;
    const items = [];
    const currentLevel = currentPage.getDepth();
    let level = this.startLevel;
    while (level <= currentLevel) {
      const page = currentPage.getAbsoluteParent(level);
      if (page != null) {
        const isActivePage = page.equals(currentPage);
        if (isActivePage && this.hideCurrent) {
          break;
        }
        if (this.checkIfNotHidden(page)) {
          const item = new NavigationItem(page.content, isActivePage, currentLevel, []);
          items.push(item);
        }
      }
      level++;
    }
    // hack to provide a size property of the expected java collection.
    items.size = items.length;
    return items;
  }

  /**
   * @private
   */
  checkIfNotHidden(page) {
    return !page.isHideInNav() || this.showHidden;
  }

  /**
   * @see ComponentExporter#getExportedType()
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  getExportedType() {
    return 'core/wcm/components/breadcrumb/v2/breadcrumb';
  }

  get data() {
    // todo: implement correctly
    return {
      json: {},
    }
  }

}
