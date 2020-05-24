/**
 * Defines the {@code Text} Sling Model used for the {@code /apps/core/wcm/components/text} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 11.0.0
 */
export default class Text {
    static clazz = 'com.adobe.cq.wcm.core.components.models.ProgressBar';
  
    constructor(content) {
       this.content = content;
    }
  
    get completed() {
        if (this.content.completed < 0) {
            return 0;
        }
        if (this.content.completed > 100) {
            return 100;
        }
      return this.content.completed;
    }

    get remaining() {
        return 100 - this.completed;
    }
  
    /**
     * @see ComponentExporter#getExportedType()
     * @since com.adobe.cq.wcm.core.components.models 12.2.0
     */
    get exportedType() {
      // return this.resource.getResourceType();
      return 'wcm/core/components/progressbar/v1/progressbar';
    }
  }
  