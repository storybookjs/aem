import PanelContainer from './PanelContainer';

/**
 * Defines the {@code Tabs} Sling Model used for the {@code /apps/core/wcm/components/tabs} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 12.5.0
 */
export default class Tabs extends PanelContainer {
  static clazz = 'com.adobe.cq.wcm.core.components.models.Tabs';

  constructor(content) {
    super(content);
  }

  /**
   * Returns the default active item
   *
   * @return The default active item
   * @since com.adobe.cq.wcm.core.components.models 12.5.0
   */
  get activeItem() {
    return this.content.activeItem || null;
  }

  /**
   * Returns an accessibility label that describes the tabs.
   *
   * @return an accessibility label for tabs
   * @since com.adobe.cq.wcm.core.components.models 12.9.0
   */
  get accessibilityLabel() {
    return this.content.accessibilityLabel || null;
  }

  /**
   * @todo: implement correctly ?
   */
  get data() {
    return {
      json: '',
    }
  }
}
