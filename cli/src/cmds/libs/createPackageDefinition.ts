import * as fs from 'fs';
import * as path from 'path';

import { log } from '../../utils';

import { manifest } from './files/manifest';
import { vaultFilter } from './files/vault.filter';
import { vaultProperties } from './files/vault.properties';
import { vaultNodeTypes } from './files/vault.nodetypes';
import { vaultConfig } from './files/vault.config';
import { vaultDefinitionContent } from './files/vault.definition.content';
import { jcr_rootContent } from './files/jcr_root.content';

const cwd = process.cwd();

const getFolderPaths = (config, metaInf) => [
  path.resolve(cwd, config.dependencies.package),
  path.resolve(cwd, config.dependencies.package, 'models'),
  path.resolve(cwd, config.dependencies.package, 'components'),
  path.resolve(cwd, config.dependencies.package, 'components', 'jcr_root'),
  path.resolve(cwd, config.dependencies.package, 'components', 'META-INF'),
  path.resolve(cwd, config.dependencies.package, 'components', 'META-INF', 'vault'),
  path.resolve(cwd, config.dependencies.package, 'components', 'META-INF', 'vault', 'definition'),
];

const getFileDefinitions = (config, metaInf) => [
  [path.resolve(metaInf, 'MANIFEST.MF'), manifest(config)],
  [path.resolve(metaInf, 'vault/filter.xml'), vaultFilter(config)],
  [path.resolve(metaInf, 'vault/properties.xml'), vaultProperties(config)],
  [path.resolve(metaInf, 'vault/nodetypes.cnd'), vaultNodeTypes(config)],
  [path.resolve(metaInf, 'vault/config.xml'), vaultConfig(config)],
  [path.resolve(metaInf, 'vault/definition/.content.xml'), vaultDefinitionContent(config)],
  [
    path.resolve(cwd, config.dependencies.package, 'components', 'jcr_root', '.content.xml'),
    jcr_rootContent(config),
  ],
];

export const createPackageDefinition = async (args, config) => {
  try {
    const metaInf = path.resolve(cwd, config.dependencies.package, 'components', 'META-INF');
    getFolderPaths(config, metaInf).forEach(folder =>
      !fs.existsSync(folder) ? fs.mkdirSync(folder) : false
    );
    getFileDefinitions(config, metaInf).forEach((filedef, index) => {
      const [filepath, content] = filedef;
      fs.writeFileSync(filepath, content);
      log(`Created: ${path.relative(cwd, filepath)}`);
    });

    return true;
  } catch (e) {
    console.error('Error creating package definition', e);
    return false;
  }
};
