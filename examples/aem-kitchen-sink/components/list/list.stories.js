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
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Runtime from '../../poc/BrowserRuntime.js';

import MyList from './list.html';
import MyItem from './item.html';

export default {
  title: 'List',
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    }
  },
};

export const List = async () => {
  const runtime = new Runtime()
    .setGlobal({
      wcmmode: { edit: true },
      component: {
        properties: {
          // todo: read from .content.xml
          'jcr:title': 'List (v2)'
        }
      },
      content: {
      }
    });

  // todo: runtime globals are not available in templates
  Object.entries(runtime.globals).forEach(([key, value]) => {
    global[key] = value;
  });
  return await MyList(runtime);
};
