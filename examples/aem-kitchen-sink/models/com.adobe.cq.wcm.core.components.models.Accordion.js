/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2019 Adobe
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
import Container from './com.adobe.cq.wcm.core.components.models.Container';

/**
 * Defines the {@code Accordion} Sling Model used for the {@code /apps/core/wcm/components/accordion} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 12.8.0
 */
export default class Accordion extends Container {
  // static clazz = 'com.adobe.cq.wcm.core.components.models.Accordion';

  constructor(content) {
    super(content);
  }

  static get clazz() {
    return 'com.adobe.cq.wcm.core.components.models.Accordion';
  }

  /**
   * Name of the configuration policy property that stores the default value for the accordion heading's HTML element.
   *
   * @see #getHeadingElement()
   * @since com.adobe.cq.wcm.core.components.models 12.8.0
   */
  //  const PN_DESIGN_HEADING_ELEMENT = "headingElement";

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
