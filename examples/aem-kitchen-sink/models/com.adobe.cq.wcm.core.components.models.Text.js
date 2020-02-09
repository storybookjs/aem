/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2018 Adobe
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
