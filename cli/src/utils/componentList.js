const path = require('path');
const { readdirSync } = require('fs');

export const componentList = (componentType, config) =>
  readdirSync(componentType, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({
      type: path.basename(componentType),
      relativePath: path.join(componentType, dirent.name),
      resourceType: path.relative(config.appsPath, path.join(componentType, dirent.name)),
      name: dirent.name,
    }));
