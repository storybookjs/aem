import Container from './Container';

/**
 * Defines the {@code Accordion} Sling Model used for the {@code /apps/core/wcm/components/accordion} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 12.8.0
 */
export default class Accordion extends Container {
  static clazz = 'com.adobe.cq.wcm.core.components.models.Accordion';

  constructor(content) {
    super(content);
  }

  /**
   * Name of the configuration policy property that stores the default value for the accordion heading's HTML element.
   *
   * @see #getHeadingElement()
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  static PN_DESIGN_HEADING_ELEMENT = "headingElement";

  /**
   * Indicates whether the accordion forces a single item to be expanded at a time or not.
   *
   * @return {@code true} if the accordion forces a single item to be expanded at a time; {@code false} otherwise
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  static isSingleExpansion() {
    return this.content.singleExpansion || false;
  }

  /**
   * Returns the items that are expanded by default.
   *
   * @return the expanded items
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  get expandedItems() {
    return [];
  }

  /**
   * Returns the HTML element to use for accordion headers.
   *
   * @return the HTML element to use for accordion headers
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  get headingElement() {
    return null;
  }
}
