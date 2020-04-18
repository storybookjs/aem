import { boolean, date } from "@storybook/addon-knobs";
import { default as examples } from './list.stories.content';

const lastModified = () => examples.lastModified;
const description = () => (examples.description[~~(examples.description.length * Math.random())]);
const url = () => (examples.url[~~(examples.url.length * Math.random())]);
const title = () => (examples.title[~~(examples.title.length * Math.random())]);
const path = () => (examples.path[~~(examples.path.length * Math.random())]);

const itemsTemplate = (content,key) => ({
    "lastModified": content.lastModified || lastModified(),
    "description": content.description || description(),
    "url": content.url || url(),
    "title": content.title || title(),
    "path": content.path || path()
});

const items = (content) => {
    if (content === undefined) content = [];
    if (typeof content === 'number') content = Array.from(Array(10).keys());
    return content.map((item,key) => itemsTemplate(item,key));
};

export const schema = (content,knobified) => {
    content = content || {};
    const data = {
        ":type": "components/list",
        ":items": items(content[":items"]),
        "dateFormatString": "dd-MM-yyyy",
        "showModificationDate": content.showModificationDate || false, 
        "showDescription": content.showDescription || false, 
        "linkItems": content.linkItems || false,
    }
    if (knobified) {
        return {
            ...data,
            "showModificationDate": boolean("showModificationDate", content.showModificationDate || false), 
            "showDescription": boolean("showDescription", content.showDescription || false), 
            "linkItems": boolean("linkItems", content.linkItems || false),
        };
    } else {
        return data;
    }
};