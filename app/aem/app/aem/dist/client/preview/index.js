"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
/* eslint-disable prefer-destructuring */
var client_1 = require("@storybook/core/client");
require("./globals");
var render_1 = require("./render");
var GenericModel_1 = require("./helpers/GenericModel");
exports.GenericModel = GenericModel_1.GenericModel;
var model_proxy_1 = require("./helpers/model-proxy");
exports.modelProxy = model_proxy_1.modelProxy;
var framework = 'aem';
var api = client_1.start(render_1["default"]);
exports.storiesOf = function (kind, m) {
    return api.clientApi.storiesOf(kind, m).addParameters({
        framework: framework
    });
};
exports.configure = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return api.configure.apply(api, __spreadArrays(args, [framework]));
};
exports.addDecorator = api.clientApi.addDecorator;
exports.addParameters = api.clientApi.addParameters;
exports.clearDecorators = api.clientApi.clearDecorators;
exports.setAddon = api.clientApi.setAddon;
exports.forceReRender = api.forceReRender;
exports.getStorybook = api.clientApi.getStorybook;
exports.raw = api.clientApi.raw;
var decorators_1 = require("./decorators/decorators");
exports.aemMetadata = decorators_1.aemMetadata;
