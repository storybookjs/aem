export const extractModels = htlFile => htlFile.split('\n')
  .filter(line => line.indexOf(`data-sly-use`) !== -1)
  .map(line => {
    let [variable, model] = line.split('data-sly-use')[1].split(`=`);
    if (variable.startsWith(`.`)) variable = variable.substr(1);
    if (model.endsWith(`\r`)) model = model.slice(0, -1);
    if (model.startsWith(`'`) || model.startsWith(`"`)) model = model.substr(1);
    if (model.endsWith(`'`) || model.endsWith(`"`)) model = model.slice(0, -1);

    return { variable, model, schema: {} };
  });