export const manifest = config =>
  `Manifest - Version: 1.0
Content - Package - Roots: ${config.dependencies.libs.join(',')}
Content - Package - Type: application
Content - Package - Id: storybook:storybook-dependencies`;
