import { getDataSly } from './getDataSly';

export const getReferencedFiles = htl => {
  const dataSly = getDataSly(htl);
  const referencedFiles = [];
  dataSly.forEach(({ value }) => {
    if (value.includes(`.html`) || value.includes(`/`)) {
      const [expression, params] = value.split(`@`);
      if (params === undefined) referencedFiles.push(expression);
      else {
        // TODO, extract file references here
        const expressionTokens = expression.split(' ');
        const paramTokens = params.split(' ');
      }
    }
  });
  return referencedFiles;
};
