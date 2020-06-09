/**
 * Defines the {@code Title} Sling Model used for the {@code /apps/core/wcm/components/title} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 11.0.0
 */
export default class Title {
  static clazz = 'com.adobe.cq.wcm.core.components.models.Title';

  constructor(content) {
    this.content = content;
  }

  /**
   * Name of the configuration policy property that will store the default value for this title's HTML element type.
   *
   * @see #getType()
   * @since com.adobe.cq.wcm.core.components.models 11.1.0
   */
  static PN_DESIGN_DEFAULT_TYPE = "type";

  /**
   * Name of the policy property that defines whether or not the title link is disabled.
   *
   * @since com.adobe.cq.wcm.core.components.models 12.4.0
   */
  static PN_TITLE_LINK_DISABLED = "linkDisabled";

  /**
   * Returns the text to be displayed as title.
   *
   * @return the title's text
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get text() {
    return this.content.text || '';
  }

  /**
   * Returns the HTML element type (h1-h6) used for the markup.
   *
   * @return the element type
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get type() {
    return this.content.type || null;
  }

  /**
   * Returns the Title's link URL, if one was set.
   *
   * @return the title's link URL, if one was set, or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 12.4.0
   */
  get linkURL() {
    return this.content.linkURL || '';
  }

  /**
   * Checks if link is disabled on the title.
   *
   * @return {@code true} if link is disabled on the title, {@code false} otherwise
   * @since com.adobe.cq.wcm.core.components.models 12.4.0
   */
  get linkDisabled() {
    return !!this.content.linkDisabled;
  }

  /**
   * @see ComponentExporter#getExportedType()
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get exportedType() {
    // return this.resource.getResourceType();
    return 'wcm/core/components/title';
  }

  /**
   * @todo: implement correctly ?
   */
  getData() {
    return {
      json: '',
    }
  }
}
