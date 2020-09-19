import { minify } from 'html-minifier';

export const minifyHTL = htl =>
  minify(htl, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    html5: true,
    keepClosingSlash: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    trimCustomFragments: true,
    useShortDoctype: true,
  });
