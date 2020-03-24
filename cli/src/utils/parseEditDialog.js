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
    else if (!uselessKeys.includes(key)) return true;
}

const convertJavaBoolToBoolean = value => {
    value = value.replace('{Boolean}');
    return value.toLowerCase() === 'true';
};

const cleanupValue = value => {
    if (!value.includes('{Boolean}')) return value;
    else return convertJavaBoolToBoolean(value);
}

let editDialog = {
    componentTitle: '',
    fields: {},
    extraClientlibs: [],
};

const parseEditDialog = (json,parentKey,grandParentKey) => {
    console.log('\n---\nparseEditDialog\n')
    console.assert(Object.keys(json).length > 1, Object.keys(json));
    // skip jcr:root
    if (Object.keys(json).length <= 1) {
        if (json.hasOwnProperty('jcr:root')) parseEditDialog(json['jcr:root'],'jcr:root');
    } else {
        console.dir(json);

        // extract name of dialog
        if (
            json.hasOwnProperty('jcr:title') && 
            json.hasOwnProperty('sling:resourceType') &&
            json['sling:resourceType'] === 'cq/gui/components/authoring/dialog'
        ) {
            editDialog.componentTitle = json['jcr:title'];
        }
        // extract extraClientLibs 
        if (json.hasOwnProperty('extraClientlibs')) {
            editDialog.extraClientlibs = json['extraClientlibs'].replace(/\[|\]/g, '').split(',');
        }
        Object.keys(json).forEach(key => {
            if (typeof json[key] === 'object') {
                if (isUseful(key)) editDialog.fields[key] = {};
                parseEditDialog(json[key],key,parentKey);
            } else {
                if (isUseful(key)) {
                    if (editDialog.fields.hasOwnProperty(parentKey)) editDialog.fields[parentKey] = cleanupValue(json[key]);
                    else editDialog.fields[key] = cleanupValue(json[key]);
                }
            }
        });
    }
    return editDialog;
};
module.exports = parseEditDialog;

