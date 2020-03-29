import { log } from './index';

const relevantCoralComponentTypes = [
  'granite/ui/components/coral/foundation/form/select',
  'granite/ui/components/coral/foundation/form/checkbox',
  'granite/ui/components/coral/foundation/well',
];

const uselessKeys = [
  'jcr:root',
  'content',
  'items',
  'tabs',
  'sections',
  'columns',
  'column',
  'configuration',
  'jcr:primaryType',
  'extraClientlibs',
  'helpPath',
];

const isUseful = key => {
  if (key === 'sling:resourceType' && !relevantCoralComponentTypes.includes(key)) return true;
  if (!uselessKeys.includes(key)) return true;
  return false;
};

const convertJavaBoolToBoolean = value => {
  const valueReplaced = value.replace('{Boolean}');
  return valueReplaced.toLowerCase() === 'true';
};

const cleanupValue = value => {
  if (!value.includes('{Boolean}')) return value;
  return convertJavaBoolToBoolean(value);
};

const editDialog = {
  componentTitle: '',
  fields: {},
  extraClientlibs: [],
};

export const parseEditDialog = (json: any, parentKey: any) => {
  log('\n---\nparseEditDialog\n');
  /* eslint-disable no-console */
  console.assert(Object.keys(json).length > 1, Object.keys(json) as any);
  // skip jcr:root
  if (Object.keys(json).length <= 1) {
    if (Object.prototype.hasOwnProperty.call(json, 'jcr:root'))
      parseEditDialog(json['jcr:root'], 'jcr:root');
  } else {
    /* eslint-disable no-console */
    console.dir(json);
    // extract name of dialog
    if (
      Object.prototype.hasOwnProperty.call(json, 'jcr:title') &&
      Object.prototype.hasOwnProperty.call(json, 'sling:resourceType') &&
      json['sling:resourceType'] === 'cq/gui/components/authoring/dialog'
    ) {
      editDialog.componentTitle = json['jcr:title'];
    }
    // extract extraClientLibs
    if (Object.prototype.hasOwnProperty.call(json, 'extraClientlibs')) {
      editDialog.extraClientlibs = json.extraClientlibs.replace(/\[|\]/g, '').split(',');
    }
    Object.keys(json).forEach(key => {
      if (typeof json[key] === 'object') {
        if (isUseful(key)) editDialog.fields[key] = {};
        parseEditDialog(json[key], parentKey);
      } else if (isUseful(key)) {
        if (Object.prototype.hasOwnProperty.call(editDialog.fields, parentKey))
          editDialog.fields[parentKey] = cleanupValue(json[key]);
        else editDialog.fields[key] = cleanupValue(json[key]);
      }
    });
  }
  return editDialog;
};
module.exports = parseEditDialog;
