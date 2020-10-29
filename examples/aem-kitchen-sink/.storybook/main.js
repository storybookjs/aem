module.exports = {
    stories: [
        `../stories/*.stories.*`,
        `../components/**/*.stories.*`,
        '../ui.frontend/src/main/webpack/stories/*.stories.*'
    ],
    addons: [
        "@storybook/addon-a11y",
        "@storybook/addon-actions",
        "@storybook/addon-backgrounds",
        "@storybook/addon-events",
        "@storybook/addon-jest",
        "@storybook/addon-knobs",
        "@storybook/addon-links",
        "@storybook/addon-options",
        "@storybook/addon-storysource",
        "@storybook/addon-viewport",
        '@storybook/addon-docs',
    ],
    roots: [
        require('@storybook/aem-core-components/jcrRoot')
    ]
};