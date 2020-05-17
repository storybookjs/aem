export const vaultDefinitionContent = config => {
  const { libs } = config.dependencies;
  const filters = libs.map(
    (lib, index) =>
      `<f${index}
      jcr:primaryType="nt:unstructured"
      mode="replace"
      root="${lib}"
      rules="[]"/>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:vlt="http://www.day.com/jcr/vault/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
  jcr:createdBy="admin"
  jcr:description=""
  jcr:primaryType="vlt:PackageDefinition"
  group="storybook"
  name="storybook-dependencies">
  <filter jcr:primaryType="nt:unstructured">
    ${filters.join(`\n    `)}
  </filter>
</jcr:root>`;
};
