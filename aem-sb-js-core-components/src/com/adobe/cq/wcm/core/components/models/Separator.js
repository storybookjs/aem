/**
 * Defines the {@code Separator} Sling Model used for the {@code /apps/core/wcm/components/Separator} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 11.0.0
 */
export default class Separator {
    static clazz = 'com.adobe.cq.wcm.core.components.models.Separator';
  
    constructor(content) {
       this.content = content;
    }
  
    get id() {
      return this.content.id;
    }
  
    /**
     * @see ComponentExporter#getExportedType()
     * @since com.adobe.cq.wcm.core.components.models 12.2.0
     */
    get exportedType() {
      // return this.resource.getResourceType();
      return 'wcm/core/components/Separator/v1/Separator';
    }
  }
  