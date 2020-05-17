import * as fs from 'fs';
import * as path from 'path';

import { log } from '../../utils';

import { manifest } from './files/manifest';
import { vaultFilter } from './files/vault.filter';
import { vaultProperties } from './files/vault.properties';
import { vaultNodeTypes } from './files/vault.nodetypes';
import { vaultConfig } from './files/vault.config';
import { vaultDefinitionContent } from './files/vault.definition.content';

const cwd = process.cwd();

const getFolderPaths = config => [
  path.resolve(cwd, config.dependencies.package),
  path.resolve(cwd, config.dependencies.package, 'models'),
  path.resolve(cwd, config.dependencies.package, 'components'),
  path.resolve(cwd, config.dependencies.package, 'components', 'jcr_root'),
  path.resolve(cwd, config.dependencies.package, 'components', 'META-INF'),
  path.resolve(cwd, config.dependencies.package, 'components', 'META-INF', 'vault'),
  path.resolve(cwd, config.dependencies.package, 'components', 'META-INF', 'vault', 'definition'),
];

const getFileDefinitions = config => [
  [
    path.resolve(cwd, config.dependencies.package, 'components', 'META-INF', 'MANIFEST.MF'),
    manifest(config),
  ],
  [
    path.resolve(cwd, config.dependencies.package, 'components', 'META-INF', 'vault', 'filter.xml'),
    vaultFilter(config),
  ],
  [
    path.resolve(
      cwd,
      config.dependencies.package,
      'components',
      'META-INF',
      'vault',
      'properties.xml'
    ),
    vaultProperties(config),
  ],
  [
    path.resolve(
      cwd,
      config.dependencies.package,
      'components',
      'META-INF',
      'vault',
      'nodetypes.cnd'
    ),
    vaultNodeTypes(config),
  ],
  [
    path.resolve(cwd, config.dependencies.package, 'components', 'META-INF', 'vault', 'config.xml'),
    vaultConfig(config),
  ],
  [
    path.resolve(
      cwd,
      config.dependencies.package,
      'components',
      'META-INF',
      'vault',
      'definition',
      '.config.xml'
    ),
    vaultDefinitionContent(config),
  ],
];

export const createPackageDefinition = async (args, config) => {
  getFolderPaths(config).forEach(folder => (!fs.existsSync(folder) ? fs.mkdirSync(folder) : false));
  getFileDefinitions(config).forEach((filedef, index) => {
    const [filepath, content] = filedef;
    fs.writeFile(filepath, content, err =>
      err
        ? console.error('Error creating package', err)
        : log(`Created: ${path.relative(cwd, filepath)}`)
    );
  });
};
