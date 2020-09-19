export const vaultFilter = config => {
  const filters = config.dependencies.libs.map(lib => `<filter root="${lib}"/>`);

  return `<?xml version="1.0" encoding="UTF-8"?>
<workspaceFilter version="1.0">
  ${filters.join(`\n  `)}
</workspaceFilter>`;
};
