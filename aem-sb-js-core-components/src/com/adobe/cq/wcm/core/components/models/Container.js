import ListItem from './ListItem';

/**
 * A base interface to be extended by containers such as the {@link Carousel}, {@link Tabs} and {@link Accordion} models.
 *
 * @since com.adobe.cq.wcm.core.components.models 12.5.0
 */
export default class Container {
  constructor(content) {
    this.content = content;
  }

  /**
   * Name of the configuration policy property that indicates if background images are enabled
   *
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  static PN_BACKGROUND_IMAGE_ENABLED = "backgroundImageEnabled";

  /**
   * Name of the configuration policy property that indicates if background colors are enabled
   *
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  static PN_BACKGROUND_COLOR_ENABLED = "backgroundColorEnabled";

  /**
   * Name of the configuration policy property that indicates if background colors are to be restricted to predefined values
   *
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  static PN_BACKGROUND_COLOR_SWATCHES_ONLY = "backgroundColorSwatchesOnly";

  /**
   * Name of the resource property that indicates that path to the background image
   *
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  static PN_BACKGROUND_IMAGE_REFERENCE = "backgroundImageReference";

  /**
   * Name of the resource property that indicates the background color
   *
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  static PN_BACKGROUND_COLOR = "backgroundColor";

  /**
   * Returns a list of container items
   *
   * @return {Array<ListItem>}List of container items
   * @since com.adobe.cq.wcm.core.components.models 12.5.0
   */
  get items() {
    const items = this.content[':items'];
    if (!items) {
      return [];
    }
    const listItems = Object.entries(items).map(([name, item]) => new ListItem({
      ':name': name,
      ...item,
    }));
    // hack to provide a size property of the expected java collection.
    listItems.size = listItems.length;
    return listItems;
  }

  /**
   * Returns the background CSS style to be applied to the component's root element
   *
   * @return CSS style string for the component's root element
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  get backgroundStyle() {
    return null;
  }

  /**
   * @see ContainerExporter#getExportedItems()
   * @since com.adobe.cq.wcm.core.components.models 12.5.0
   */
  get exportedItems() {
    return null;
  }

  /**
   * @see ContainerExporter#getExportedItemsOrder()
   * @since com.adobe.cq.wcm.core.components.models 12.5.0
   */
  get exportedItemsOrder() {
    return [];
  }
}
