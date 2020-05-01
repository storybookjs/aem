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

    /* eslint-disable prefer-const */
    let [componentType, name] = path.split('clientlibs');
    if (name.startsWith('/')) name = name.substr(1);

    if (cache[componentType]) {
      cache[componentType].clientlibs[name] = { css, js };
    } else {
      cache.clientlibs[componentType] = { css, js };
    }
  }

  return cache;
};
