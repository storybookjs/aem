const webpack = require('webpack');

module.exports = {
  stories: [
    `../src/jcr_root/apps/core/wcm/components/**/*.stories.*`,
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
  ],
  webpackFinal: (config) => {
    // this will need to be done for the user
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        validator: 'jquery-validation'
      })
    );
    return config;
  },
};

AEMRegisterJcrRoot(require('../config').jcrRoots);