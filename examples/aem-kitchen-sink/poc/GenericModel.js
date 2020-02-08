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
 * Generic model implementation that mocks a Sling Model class.
 */
class GenericModel {
  constructor(descriptor) {
    this.descriptor = descriptor;
  }

  use(context) {
    const { content } = context;
    const model = {};
    Object.entries(this.descriptor.properties).forEach(([key, value]) => {
      if (typeof value !== 'function' && content[key]) {
        model[key] = content[key];
      } else {
        model[key] = value;
      }
    });
    return model;
  }
}

// todo: load automatically
const tm = require('../models/com.adobe.cq.wcm.core.components.models.Text');

module.exports = (id) => {
  return new Proxy(GenericModel, {
    construct(target, argArray, newTarget) {
      return new target(tm);
    }
  });
};
