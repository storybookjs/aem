import { aemMetadata } from '@storybook/aem';

export default {
  title: 'Core Components/Text',
  decorators: [
    aemMetadata({
      decorationTag: {}
    }),
  ]
};

const resourceType = 'storybook/components/text';

export const Standard = () => ({
  content: {
    "id": "text-2d9d50c5a7",
    "text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\n",
    "richText": true,
    ":type": "core/wcm/components/text/v2/text",
    "dataLayer": {
      "text-2d9d50c5a7": {
        "xdm:text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu mi bibendum neque egestas congue quisque egestas. Varius morbi enim nunc faucibus a pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.</p>\n",
        "repo:modifyDate": "2019-01-22T11:56:17Z",
        "@type": "core/wcm/components/text/v2/text"
      }
    }
  },
  resourceType: resourceType,
});

export const TypeFormatting = () => ({
  content: {
    "id": "text-6d91c6d9a4",
    "text": "<p><b>Bold </b>can be used to emphasize a word or phrase, as can <u>underline</u> and <i>italics.&nbsp;</i><sup>Superscript</sup> and <sub>subscript</sub> are useful for mathematical (E = mc<sup>2</sup>) or scientific (h<sub>2</sub>O) expressions. Paragraph styles can provide alternative renderings, such as quote sections:</p>\n<blockquote>&quot;<i>Be yourself; everyone else is already taken&quot;</i></blockquote>\n<blockquote>- Oscar Wilde</blockquote>\n",
    "richText": true,
    ":type": "core/wcm/components/text/v2/text",
    "dataLayer": {
      "text-6d91c6d9a4": {
        "xdm:text": "<p><b>Bold </b>can be used to emphasize a word or phrase, as can <u>underline</u> and <i>italics.&nbsp;</i><sup>Superscript</sup> and <sub>subscript</sub> are useful for mathematical (E = mc<sup>2</sup>) or scientific (h<sub>2</sub>O) expressions. Paragraph styles can provide alternative renderings, such as quote sections:</p>\n<blockquote>&quot;<i>Be yourself; everyone else is already taken&quot;</i></blockquote>\n<blockquote>- Oscar Wilde</blockquote>\n",
        "repo:modifyDate": "2019-01-22T12:17:02Z",
        "@type": "core/wcm/components/text/v2/text"
      }
    }
  },
  resourceType: resourceType,
});

export const Lists = () => ({
  content: {
    "id": "text-d7f5d18c60",
    "text": "<ul>\r\n<li>List item</li>\r\n<li>List item</li>\r\n<li>List item</li>\r\n<li>List item</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<ol>\r\n<li>List Item 1</li>\r\n<li>List Item 2</li>\r\n<li>List item 3</li>\r\n<li>List item 4</li>\r\n</ol>\r\n",
    "richText": true,
    ":type": "core/wcm/components/text/v2/text",
    "dataLayer": {
      "text-d7f5d18c60": {
        "xdm:text": "<ul>\r\n<li>List item</li>\r\n<li>List item</li>\r\n<li>List item</li>\r\n<li>List item</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<ol>\r\n<li>List Item 1</li>\r\n<li>List Item 2</li>\r\n<li>List item 3</li>\r\n<li>List item 4</li>\r\n</ol>\r\n",
        "repo:modifyDate": "2018-12-07T12:48:02Z",
        "@type": "core/wcm/components/text/v2/text"
      }
    }
  },
  resourceType: resourceType,
});

export const Table = () => ({
  content: {
    "id": "text-6ecfe1f00f",
    "text": "<table cellpadding=\"5\" cellspacing=\"0\" border=\"1\">\n<tbody><tr><td>Column 1</td>\n<td>Column 2</td>\n<td>Column 3</td>\n<td>Column 4</td>\n</tr><tr><td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr><tr><td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr><tr><td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr><tr><td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr><tr><td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr></tbody></table>\n",
    "richText": true,
    ":type": "core/wcm/components/text/v2/text",
    "dataLayer": {
      "text-6ecfe1f00f": {
        "xdm:text": "<table cellpadding=\"5\" cellspacing=\"0\" border=\"1\">\n<tbody><tr><td>Column 1</td>\n<td>Column 2</td>\n<td>Column 3</td>\n<td>Column 4</td>\n</tr><tr><td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr><tr><td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr><tr><td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr><tr><td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr><tr><td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n<td>&nbsp;</td>\n</tr></tbody></table>\n",
        "repo:modifyDate": "2019-01-14T14:02:56Z",
        "@type": "core/wcm/components/text/v2/text"
      }
    }
  },
  resourceType: resourceType,
});