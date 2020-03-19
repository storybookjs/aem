"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/**
 * Generic model implementation automatically exposes the properties and collections from the
 * underlying model content.
 */
var GenericModel = /** @class */ (function () {
    function GenericModel(content) {
        if (content === void 0) { content = {}; }
        this.content = content;
        /**
         * Proxy handler for the abstract model. It assumes best practices when mapping the underlying
         * sling model to the potential use cases.
         */
        return new Proxy(this, {
            get: function (target, prop) {
                // property / getter / function of sub class has priority
                if (prop in this) {
                    return this[prop];
                }
                if (prop in content) {
                    return content[prop];
                }
                if (prop === 'items') {
                    var items = content[':items'];
                    if (!items) {
                        return [];
                    }
                    var listItems = Object.entries(items).map(function (_a) {
                        var name = _a[0], item = _a[1];
                        return new GenericModel(__assign({ ':name': name }, item));
                    });
                    // hack to provide a size property of the expected java collection.
                    listItems.size = listItems.length;
                    return listItems;
                }
                if (prop === 'name') {
                    return content[':name'];
                }
                if (prop === 'path') {
                    return content[':path'];
                }
                return undefined;
            },
            has: function (target, key) {
                return key in content || key in this || key === 'items' || key === 'name' || key === 'path';
            }
        });
    }
    return GenericModel;
}());
exports.GenericModel = GenericModel;
