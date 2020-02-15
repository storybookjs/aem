/**
 * Defines the {@code Text} Sling Model used for the {@code /apps/core/wcm/components/text} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 11.0.0
 */
export default class Text {
  static clazz = 'com.adobe.cq.wcm.core.components.models.Text';

  constructor(content) {
     this.content = content;
  }

  /**
   * Retrieves the text value to be displayed.
   *
   * @return the text value to be displayed, or {@code null} if no value can be returned
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get text() {
    return this.content.text || null;
  }

  /**
   * Checks if the text to be displayed is rich text or not.
   *
   * @return {@code true} if the text is rich (HTML formatting), {@code false otherwise}
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get isRichText() {
    return this.content.isRichText || false;
  }

  /**
   * @see ComponentExporter#getExportedType()
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get exportedType() {
    // return this.resource.getResourceType();
    return 'wcm/core/components/text';
  }
}
