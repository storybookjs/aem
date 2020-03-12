const NEW_LINE = '\n';

function extractBasePath(basePathExpression) {
  return basePathExpression.replace(/^\s*#base\s*=\s*/, '');
}

function resolveDependencyFolder(contextPath, source) {
  const baseExpression = source.split(NEW_LINE).find(line => /^\s*#\s*base/.test(line));
  return contextPath + (baseExpression ? `/${extractBasePath(baseExpression)}` : '');
}

function isAbsolutePath(path) {
  return path.charAt(0) === '/';
}

module.exports = function(source) {
  const depedencies = source
    .split(NEW_LINE)
    // Ignore commented lines starting with a #
    .filter(line => !/^\s*#/.test(line))
    // Ignore empty rows
    .filter((line) => line);

  const dependencyFolder = resolveDependencyFolder(this.context, source);
  const requireCalls = depedencies.map(dependency => 
    `require('${dependencyFolder}${isAbsolutePath(dependency) ? dependency.trim() : `/${dependency.trim()}`}');`);
  return requireCalls.join(NEW_LINE);
  
};
