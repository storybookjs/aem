import AbstractComponent from "./AbstractComponent";

export default class Component extends AbstractComponent {
  constructor(content, context) {
    super(content, context)
    this.content = content;
  }

  /**
   * Name of the resource property that indicates the HTML id for the component.
   *
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  static PN_ID = "id";

  /**
   * Returns the HTML id of the the component's root element
   *
   * @todo: how to implement ?
   *
   * @return HTML id of the component's root element
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  get id() {
    return '';
  }
}
