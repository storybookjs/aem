import { aemMetadata } from '@storybook/aem';

export default {
    title: 'Storybook Title',
    decorators: [
        aemMetadata({
            decorationTag: {}
        }),
    ]
};

export const StorybookTitle = () => {
    return {
        content: {
            "id": "title-e8a4f1e792",
            "linkDisabled": false,
            "type": "h1",
            "text": "Title",
            ":type": "core/wcm/components/title/v2/title",
            "dataLayer": {
                "title-e8a4f1e792": {
                    "dc:title": "Title",
                    "repo:modifyDate": "2018-12-07T12:50:54Z",
                    "@type": "core/wcm/components/title/v2/title"
                }
            }
        },
        resourceType: 'storybook/components/title',
    };
};