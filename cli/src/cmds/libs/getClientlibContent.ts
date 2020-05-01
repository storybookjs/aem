import { fetchFromAEM } from '../../utils';

/* eslint-disable no-param-reassign */
export const getClientlibContent = async (fileArray, cache) => {
  cache.clientlibs = {};
  /* eslint-disable no-plusplus, no-await-in-loop */
  for (let i = 0; i < fileArray.length; i++) {
    let css = '';
    let js = '';

    const { path } = fileArray[i];
    const cssResponse = await fetchFromAEM({ url: `${path}.css` });
    const jsResponse = await fetchFromAEM({ url: `${path}.js` });

    if (cssResponse.ok) css = await cssResponse.text();
    if (jsResponse.ok) js = await jsResponse.text();

    const componentType = path.split('clientlibs')[0];

    if (cache[componentType]) {
      cache[componentType].css = css;
      cache[componentType].js = js;
    } else {
      cache.clientlibs[componentType] = { css, js };
    }
  }

  return cache;
};
