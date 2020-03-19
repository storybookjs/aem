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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var path = require("path");
var modGen = function (baseDir, varName, id) {
    // todo: only proxy the models atually defined as models.
    return "const " + varName + " = require('@storybook/aem').modelProxy(" + JSON.stringify(id) + ");";
};
function webpack(config) {
    return __assign(__assign({}, config), { module: __assign(__assign({}, config.module), { rules: __spreadArrays(config.module.rules, [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: require.resolve('htl-loader'),
                            options: {
                                moduleImportGenerator: modGen,
                                includeRuntime: false,
                                globalName: 'context',
                                runtimeVars: ['wcmmode', 'component']
                            }
                        },
                    ]
                },
                {
                    test: /\.content\.xml$/,
                    use: [
                        {
                            loader: path.resolve(__dirname, './aem-component-loader.js')
                        },
                    ]
                },
            ]) }) });
}
exports.webpack = webpack;
