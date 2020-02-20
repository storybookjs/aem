/**
 * Interface for a generic list item, used by the {@link List} and {@link Search} models.
 *
 * @since com.adobe.cq.wcm.core.components.models 12.2.0
 */
export default class ListItem {
  static clazz = 'com.adobe.cq.wcm.core.components.models.ListItem';

  constructor(content) {
    this.content = content;
  }

  /**
   * Returns the URL of this {@code ListItem}.
   *
   * @return the URL of this list item or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get URL() {
    return null;
  }

  /**
   * Returns the title of this {@code ListItem}.
   *
   * @return the title of this list item or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get title() {
    return this.content.title;
  }

  /**
   * Returns the description of this {@code ListItem}.
   *
   * @return the description of this list item or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get description() {
    return this.content.description;
  }

  /**
   * Returns the date when this {@code ListItem} was last modified.
   *
   * @return the last modified date of this list item or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get lLastModified() {
    return 0;
  }

  /**
   * Returns the path of this {@code ListItem}.
   *
   * @return the list item path or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get path() {
    // this is kind of cheating. todo: figure out a better way to provide the resource
    // return this.resource.getPath();
    return this.content[':path'] || null;
  }

  /**
   * Returns the name of this {@code ListItem}.
   *
   * @return the list item name or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 12.6.0
   */
  get name() {
    // return this.resource.getName();
    return this.content[':name'] || null;
  }
}
