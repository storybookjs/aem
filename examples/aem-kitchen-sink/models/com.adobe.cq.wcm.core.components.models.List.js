/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Adobe
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Model descriptor of the 'Text' component'
 * Notes:
 * - they could be automatically extracted from the java interface
 * - don't know if we really need those, but it would give more stability for developers who
 *   use models (as opposed to `${properties.xyz}` ).
 */
module.exports = {
  clazz: 'com.adobe.cq.wcm.core.components.models.List',
  properties: {
    text: '',
    isRichText: '',
    get exportedType() {
      // return this.resource.getResourceType();
      return 'wcm/core/components/text';
    },

    get listItems() {
      return [
        {
          title: 'Item 1',
        },
        {
          title: 'Item 2',
        }
      ];
    }
  }
};
