import { sep as pathSeparator } from 'path';

const NEW_LINE = '\n';

const extractBasePath = basePathExpression => {
  return basePathExpression.replace(/^\s*#base\s*=\s*/, '').replace(/\r/, '');
};

const resolveDependencyFolder = (contextPath, source) => {
  const baseExpression = source.split(NEW_LINE).find(line => /^\s*#\s*base/.test(line));
  return contextPath + (baseExpression ? `/${extractBasePath(baseExpression)}` : '');
};

const isAbsolutePath = filepath => filepath.charAt(0) === '/';

export default function aemClientLibTxtLoader(source) {
  const depedencies = source
    .split(NEW_LINE)
    // Ignore commented lines starting with a #
    .filter(line => !/^\s*#/.test(line))
    // Ignore empty rows
    .filter(line => line);

  const dependencyFolder = resolveDependencyFolder(
    this.context.split(pathSeparator).join('/'),
    source
  );

  return depedencies
    .map(dependency => {
      const trimmedDependency = isAbsolutePath(dependency)
        ? dependency.trim()
        : `/${dependency.trim()}`;
      const filepath = `${dependencyFolder}${trimmedDependency}`;

      if (!filepath.endsWith('/')) return `require('${filepath}');`;
    })
    .join(NEW_LINE);
}
