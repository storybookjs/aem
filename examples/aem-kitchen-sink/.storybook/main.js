module.exports = {
  stories: [
    `../stories/*.stories.*`,
    `../components/**/*.stories.*`,
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
    "@storybook/addon-backgrounds",
    "@storybook/addon-events",
    "@storybook/addon-jest",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-options",
    "@storybook/addon-storysource",
    "@storybook/addon-viewport"
  ]
};

// need to specify the additional jcrRoots from dependencies
AEMRegisterJcrRoot(require('aem-js-core-components/config').jcrRoots);
