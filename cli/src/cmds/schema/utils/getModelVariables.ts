export const getModelVariables = (model, htlFile) => {
  const { variable, schema } = model;
  // trying to match anything that starts ${
  // ends with } 
  // and get what's in between

  htlFile.split('\n')
    .filter(line =>
      line.includes(variable) &&
      (
        line.includes('${') ||
        line.includes('}') ||
        line.includes(`${variable}.`)
      )
    )
    .map(line => {
      line
        .split('${')[1]
        .split('}')[0]
        .split(' ')
        .filter(expressionPart => expressionPart.includes(`${variable}.`))
        .map(expressionPart => {
          const childVariable = expressionPart.split(`${variable}.`)[1];
          if (!childVariable.includes('.')) schema[childVariable] = '';
          else {
            // eventually make this recursive
            const [parent, grandchild] = childVariable.split('.');
            schema[parent] = {
              [grandchild]: '',
            };
          }
          return childVariable;
        });
    });

  return model;
};