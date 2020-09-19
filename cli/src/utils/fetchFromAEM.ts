import * as path from 'path';
import fetch from 'node-fetch';
import base64 from 'base-64';
import { log } from './index';

export const fetchFromAEM = async config => {
  const errorMessage = config.errorMessage || 'Error Fetching from AEM';
  const url =
    config.url.indexOf('http://localhost:4502') !== -1
      ? config.url
      : `http://${path.join(`localhost:4502`,config.url)}`;
  const response = await fetch(url, {
    method: config.method,
    headers: {
      Authorization: `Basic ${base64.encode(`admin:admin`)}`,
    },
    body: config.body || null,
  }).catch(error => log(errorMessage, error));

  return response;
};
