import { basename } from 'path';
import { fetchFromAEM } from '../../utils';

/* eslint-disable no-param-reassign */
export const getContentXml = async (file) => {
  if (!file) throw new Error(`No file found`);
  const rawContentObj = await fetchFromAEM({ url: file.path });
  const rawContent = JSON.parse(await rawContentObj.text());
  return rawContent ? `<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    cq:icon="${rawContent['cq:icon'] ? rawContent['cq:icon'] : ''}"
    cq:isContainer="${rawContent['cq:isContainer'] ? rawContent['cq:isContainer'] : ''}"
    jcr:description="${rawContent['jcr:description='] ? rawContent['jcr:description=']:''}"
    jcr:primaryType="${rawContent['jcr:primaryType'] ? rawContent['jcr:primaryType']:''}"
    sling:resourceSuperType="${rawContent['sling:resourceSuperType'] ? rawContent['sling:resourceSuperType']:''}"
    jcr:title="${rawContent['jcr:title'] ? rawContent['jcr:title']:''}"
    componentGroup="${rawContent['componentGroup'] ? rawContent['componentGroup']:''}"/>` : null;
};
