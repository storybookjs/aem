import { boolean, date } from "@storybook/addon-knobs";
import { default as examples } from './list.stories.content';

// const lastModified = () => examples.lastModified;
// const description = () => selectOption(examples.description);
// const url = () => selectOption(examples.url);
// const title = () => selectOption(examples.title);
// const path = () => selectOption(examples.path);

// const itemsTemplate = (content,key) => ({
//     "lastModified": content.lastModified || lastModified(),
//     "description": content.description || description(),
//     "url": content.url || url(),
//     "title": content.title || title(),
//     "path": content.path || path()
// });

// const items = (content) => {
//     if (content === undefined) content = [];
//     if (typeof content === 'number') content = Array.from(Array(10).keys());
//     return content.map((item,key) => itemsTemplate(item,key));
// };

// export const schema = (content,knobified) => {
//     content = content || {};
//     const data = {
//         ":type": "components/list",
//         ":items": items(content[":items"]),
//         "dateFormatString": "dd MMMM, yyyy",
//         "showModificationDate": content.showModificationDate || false, 
//         "showDescription": content.showDescription || false, 
//         "linkItems": content.linkItems || false,
//     };
//     if (knobified) {
//         return {
//             ...data,
//             "showModificationDate": boolean("showModificationDate", content.showModificationDate || false), 
//             "showDescription": boolean("showDescription", content.showDescription || false), 
//             "linkItems": boolean("linkItems", content.linkItems || false),
//         };
//     } else {
//         return data;
//     }
// };

export const Schema = () => ({
    ":type": "components/list",
    "dateFormatString": "dd MMMM, yyyy",
    "showModificationDate": {
        type: "boolean",
        label: "Show Modification Date",
        defaultValue: false
    },
    "showDescription": {
        type: "boolean",
        label: "Show Description",
        defaultValue: false
    },
    "linkItems": {
        type: "boolean",
        label: "Link Items",
        defaultValue: false
    },
    ":items": [
        {
            "lastModified": {
                type: "date",
                label: "Last Modified",
                defaultValue: examples.lastModified,
                defaultValues: examples.lastModified,
            },
            "description": {
                type: "text",
                label: "Description",
                defaultValue: selectOption(examples.description),
                defaultValues: examples.description,
            },
            "url": {
                type: "text",
                label: "URL",
                defaultValue: selectOption(examples.url),
                defaultValues: examples.url,
            },
            "title": {
                type: "text",
                label: "Title",
                defaultValue: selectOption(examples.title),
                defaultValues: examples.title,
            },
            "path": {
                type: "text",
                label: "Path",
                defaultValue: selectOption(examples.path),
                defaultValues: examples.path,
            },
        }
    ]
});

export const itemsFromSchema = (config = []) => {
    if (typeof content === 'number') content = Array.from(Array(10).keys());
    return content.map((item,key) => itemsTemplate(item,key));
};

export const contentFromSchema = (schema = Schema(), config = {}, knobify = false) => {
    const content = {};
    Object.keys(schema).map(key => {
        const value = schema[key];

        if (typeof value === "string") content[key] = config[key] || value;
        else if (Array.isArray(value)) {
            console.log('do array stuff',key,value);
            if (config.hasOwnProperty(key) && typeof config[key] === "number") {
                console.log('config.key',config[key],config);
                Array.from(Array(10).keys());
            }
            content[key] = value; 
        } else if (typeof value ===  "object") {
            if (value.hasOwnProperty('defaultValue') && typeof value.defaultValue !== 'object') {
                content[key] = config[key] || value.defaultValue;
            } else if (value.hasOwnProperty('defaultValue') && typeof value.defaultValue === 'object') {
                content[key] = [];
                Object.keys(value.defaultValue).map((objectKey,index) => {
                    const objectValue = value.defaultValue[objectKey];
                    if (typeof objectValue === 'string') {
                        content[key][index][objectKey] = objectValue;
                    } else if (objectValue.hasOwnProperty('defaultValue')) {
                        content[key][index][objectKey] = objectValue.defaultValue;
                    }
                });
            }
        }
    });
    return content;
};
// if (typeof value === 'string') content[key] = config[key] || value;
// if (typeof schema[key] === 'object') {
//     if ()
//     content[key] = config[key] || schema[key].hasOwnProperty("defaultValue") ? schema[key].defaultValue : '';
// }
// else if (Array.isArray(schema[key])) {
//     content[key] = [];
//     schema[key].map((items,index) => {
//         if (Array.isArray(items)) console.log('item is array');
//         else if (typeof items === 'object') {
//             Object.keys(items).map(item => {
//                 content[key][item] = schema[key][index][item].hasOwnProperty("defaultValue") ? schema[key][index][item].defaultValue : '';
//             });
//         }
//     });