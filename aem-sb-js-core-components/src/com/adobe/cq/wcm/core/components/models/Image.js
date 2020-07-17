import { GenericModel } from '@storybook/aem';

/**
 * Defines the {@code Image} Sling Model used for the {@code /apps/core/wcm/components/image} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 11.0.0
 */
export default class Image extends GenericModel {
  constructor(content) {
    return super(content);
  }

  /**
   * Name of the configuration policy property that will store the allowed rendition widths for an image.
   *
   * @since com.adobe.cq.wcm.core.components.models 11.0.0
   */
  static PN_DESIGN_ALLOWED_RENDITION_WIDTHS = "allowedRenditionWidths";

  /**
   * Name of the configuration policy property that will store the image quality for an image.
   *
   * @since com.adobe.cq.wcm.core.components.models 12.5.0
   */
  static PN_DESIGN_JPEG_QUALITY = "jpegQuality";

  /**
   * Name of the configuration policy property that will indicate if lazy loading should be disabled.
   *
   * @since com.adobe.cq.wcm.core.components.models 11.0.0
   */
  static PN_DESIGN_LAZY_LOADING_ENABLED = "disableLazyLoading";

  /**
   * Name of the resource property that will indicate if the image is decorative.
   *
   * @since com.adobe.cq.wcm.core.components.models 11.0.0
   */
  static PN_IS_DECORATIVE = "isDecorative";

  /**
   * Name of the policy property that defines whether or not the UUID is disabled.
   *
   * @since com.adobe.cq.wcm.core.components.models 12.4.0
   */
  static PN_UUID_DISABLED = "uuidDisabled";

  /**
   * Name of the resource property that will indicate if the image's caption will be rendered as a popup.
   *
   * @since com.adobe.cq.wcm.core.components.models 11.0.0
   */
  static PN_DISPLAY_POPUP_TITLE = "displayPopupTitle";

  /**
   * Name of the JSON property that will store the smart sizes for smart loading.
   *
   * @since com.adobe.cq.wcm.core.components.models 11.0.0
   * @deprecated since 12.1.0
   */
  static JSON_SMART_SIZES = "smartSizes";

  /**
   * Name of the JSON property that will store the smart images for smart loading.
   *
   * @since com.adobe.cq.wcm.core.components.models 11.0.0
   * @deprecated since 12.1.0
   */
  static JSON_SMART_IMAGES = "smartImages";

  /**
   * Name of the JSON property that will indicate if the image should be loaded lazily.
   *
   * @since com.adobe.cq.wcm.core.components.models 11.0.0
   * @deprecated since 12.1.0
   */
  static JSON_LAZY_ENABLED = "lazyEnabled";

  /**
   * Name of the configuration policy property that will indicate if the value of the {@code alt} attribute should be populated from
   * DAM if the component is configured with a file reference.
   *
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  static PN_ALT_VALUE_FROM_DAM = "altValueFromDAM";

  /**
   * Name of the configuration policy property that will indicate if the value of the {@code title} attribute should be populated from
   * DAM if the component is configured with a file reference.
   *
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  static PN_TITLE_VALUE_FROM_DAM = "titleValueFromDAM";

  /**
   * Name of the resource property that will indicate if the current image should be flipped horizontally.
   *
   * @since com.adobe.cq.wcm.core.components.models 12.3.0
   */
  static PN_FLIP_HORIZONTAL = "imageFlipHorizontal";

  /**
   * Name of the resource property that will indicate if the current image should be flipped vertically.
   *
   * @since com.adobe.cq.wcm.core.components.models 12.3.0
   */
  static PN_FLIP_VERTICAL = "imageFlipVertical";

  /**
   * Name of the resource property that defines areas of an image map.
   *
   * The property stores map areas as follows:
   * [area1][area2][...]
   *
   * Area format:
   * [SHAPE(COORDINATES)"HREF"|"TARGET"|"ALT"|(RELATIVE_COORDINATES)]
   *
   * Example:
   * [rect(0,0,10,10)"http://www.adobe.com"|"_self"|"alt"|(0,0,0.8,0.8)][circle(10,10,10)"http://www.adobe.com"|"_self"|"alt"|(0.8,0.8,0.8)]
   *
   * @since com.adobe.cq.wcm.core.components.models 12.4.0
   */
  static PN_MAP = "imageMap";

  /**
   * Returns the value for the {@code src} attribute of the image.
   *
   * @return the image's URL
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get src() {
    return this.content.src;
  }

  /**
   * Returns the value for the {@code alt} attribute of the image.
   *
   * @return the value for the image's {@code alt} attribute, if one was set, or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get alt() {
    return this.content.alt;
  }

  /**
   * Returns the value for the image's {@code title} attribute, if one was set.
   *
   * @return the value for the image's {@code title} attribute, if one was set, or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get title() {
    return this.content.title;
  }

  /**
   * Returns the value for the image's uuid, if one was set.
   *
   * @return the value for the image's uuid, if one was set, or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 12.4.0;
   */
  get uuid() {
    return this.content.uuid;
  }

  /**
   * Returns the image's link URL, if one was set.
   *
   * @return the image's link URL, if one was set, or {@code null}
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get link() {
    return this.content.link;
  }

  /**
   * Checks if the image should display its caption as a popup (through the <code>&lt;img&gt;</code> {@code title}
   * attribute).
   *
   * @return {@code true} if the caption should be displayed as a popup, {@code false} otherwise
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get displayPopupTitle() {
    return this.content.displayPopupTitle;
  }

  /**
   * Returns the file reference of the current image, if one exists.
   *
   * @return the file reference of the current image, if one exists, {@code null} otherwise
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   */
  get fileReference() {
    return this.content.fileReference;
  }

  /**
   * Returns a JSON object used for the smart image functionality. The object provides the following properties:
   *
   * <ul>
   *     <li>{@link #JSON_SMART_SIZES} - array of integers, representing the available image widths</li>
   *     <li>{@link #JSON_SMART_IMAGES} - array of strings, providing the URLs for the available image renditions</li>
   *     <li>{@link #JSON_LAZY_ENABLED} - boolean, specifying if the image should be rendered lazily or not</li>
   * </ul>
   *
   * @return the JSON for the smart image functionality
   * @since com.adobe.cq.wcm.core.components.models 11.0.0; marked <code>default</code> in 12.1.0
   * @deprecated since 12.1.0
   */
  get json() {
    return this.content.json;
  }

  /**
   * Returns the alternative image widths (in pixels), configured through the {@link #PN_DESIGN_ALLOWED_RENDITION_WIDTHS}
   * content policy. If no configuration is present, this method will return an empty array.
   *
   * @return the alternative image widths (in pixels)
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get widths() {
    return this.content.widths;
  }

  /**
   * Returns a URI template representation of the image src attribute that can be variable expanded
   * to a URI reference. Useful for building an alternative image configuration from the original src.
   *
   * @return the image src URI template
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get srcUriTemplate() {
    return this.content.srcUriTemplate;
  }

  /**
   * Indicates if the image should be rendered lazily or not.
   *
   * @return true if the image should be rendered lazily; false otherwise
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get lazyEnabled() {
    return this.content.lazyEnabled;
  }

  /**
   * Returns a list of image map areas.
   *
   * @return the image map areas
   * @since com.adobe.cq.wcm.core.components.models 12.4.0
   */
  get areas() {
    return this.content.areas;
  }

  /**
   * @see ComponentExporter#getExportedType()
   * @since com.adobe.cq.wcm.core.components.models 12.2.0
   */
  get exportedType() {
    return 'core/wcm/components/image/v2/image';
  }

  /**
   * Indicates whether the image is decorative.
   *
   * @return true if the image is decorative; false otherwise
   * @since com.adobe.cq.wcm.core.components.models 12.11.0
   */
  get decorative() {
    return this.content.decorative;
  };

  /**
   * @todo: implement correctly ?
   */
  get data() {
    return {
      json: JSON.stringify(this.content.dataLayer || {}),
    }
  }

}
