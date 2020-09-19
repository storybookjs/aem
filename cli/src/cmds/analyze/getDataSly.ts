/* eslint-disable no-param-reassign */
const trimValue = value => {
  if (value.startsWith(`"`) || value.startsWith(`'`)) value = value.substring(1);
  if (value.endsWith(`"`) || value.endsWith(`'`)) value = value.slice(0, -1);
  if (value.startsWith(`$`)) value = value.substring(1);
  if (value.startsWith(`{`)) value = value.substring(1);
  if (value.endsWith(`}`)) value = value.slice(0, -1);

  return value;
};

export const getDataSly = fileContent => {
  const dataSlyRegex = /(data-sly-(.*?)="(.*?)")/g;

  return fileContent.match(dataSlyRegex).map(attr => {
    let variable = false;
    const [root, value] = attr.split(/=(.+)/);
    /* eslint-disable prefer-destructuring */
    if (root.includes(`.`)) variable = root.split('.')[1];
    const type = root.split(`data-sly-`)[1].split(`.`)[0];

    return {
      attr,
      root,
      type,
      variable,
      value: trimValue(value),
    };
  });
};
