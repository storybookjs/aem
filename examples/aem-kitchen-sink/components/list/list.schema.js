import { default as examples } from './list.stories.content';
import { selectOption } from '../../.storybook/schema';

const Schema = () => ({
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

export default Schema;