"use strict";
exports.__esModule = true;
var NEW_LINE = '\n';
function extractBasePath(basePathExpression) {
    return basePathExpression.replace(/^\s*#base\s*=\s*/, '');
}
function resolveDependencyFolder(contextPath, source) {
    var baseExpression = source.split(NEW_LINE).find(function (line) { return /^\s*#\s*base/.test(line); });
    return contextPath + (baseExpression ? "/" + extractBasePath(baseExpression) : '');
}
function isAbsolutePath(path) {
    return path.charAt(0) === '/';
}
function aemClientLibTxtLoader(source) {
    var depedencies = source
        .split(NEW_LINE)
        // Ignore commented lines starting with a #
        .filter(function (line) { return !/^\s*#/.test(line); })
        // Ignore empty rows
        .filter(function (line) { return line; });
    var dependencyFolder = resolveDependencyFolder(this.context, source);
    var requireCalls = depedencies.map(function (dependency) {
        return "require('" + dependencyFolder + (isAbsolutePath(dependency) ? dependency.trim() : "/" + dependency.trim()) + "');";
    });
    return requireCalls.join(NEW_LINE);
}
exports["default"] = aemClientLibTxtLoader;
