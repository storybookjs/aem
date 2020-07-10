export const getListVariables = (model, htlFile) => {
  const { variable, schema } = model;

  htlFile.split('\n')
    .filter(line =>
      line.includes(variable) &&
      (
        line.includes('data-sly-repeat') ||
        line.includes('data-sly-list')
      )
    )
    .forEach(line => {
      const expression = line.includes('data-sly-list')
        ? line.split('data-sly-list')[1]
        : line.split('data-sly-repeat')[1];

      let listItemVariable = expression.split('=')[0];
      if (listItemVariable.indexOf('.') === 0) listItemVariable = listItemVariable.substr(1);
      if (listItemVariable.length === 0) listItemVariable = 'item';

      const listVariable = expression.split('${')[1].split('}')[0].split(`${variable}.`)[1].split('.');
      if (listVariable.length === 1) {
        schema[listVariable[0]][listItemVariable] = {};
      }
    });

  return model;
};