import { aemMetadata } from '@storybook/aem';

export default {
    title: 'Accordion',
    decorators: [
        aemMetadata({
            decorationTag: {
                cssClasses: ['accordion', 'component'],
                tagName: 'article'
            }
        }),
    ]
};

export const StorybookAccordion = () => {
    return {
        resourceType: 'storybook/components/accordion',
    };
};