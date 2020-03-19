"use strict";
exports.__esModule = true;
var ComponentLoader = /** @class */ (function () {
    function ComponentLoader() {
    }
    ComponentLoader.prototype.resolve = function (type, resources) {
        var comps = resources || [];
        return comps.find(function (c) { return c.resourceType === type; });
    };
    return ComponentLoader;
}());
exports["default"] = ComponentLoader;
