"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable valid-typeof */
var global_1 = require("global");
var Runtime = require("@adobe/htlengine/src/runtime/Runtime");
console.log('Runtime:', Runtime);
var ComponentLoader_1 = require("./helpers/ComponentLoader");
var ResourceResolver_1 = require("./helpers/ResourceResolver");
var DIV_TAG = 'div';
var TYPE_STRING = 'string';
var TYPE_FUNCTION = 'function';
var PROPERTY_TAG_NAME = 'tagName';
var PROPERTY_CSS_CLASSES = 'cssClasses';
var ATTRIBUTE_CLASS = 'class';
var ROOT_ELEMENT = global_1.document.getElementById('root');
/**
 * Gets the runtime object with all params set
 */
var createRuntime = function (wcmmode, content, resourceLoaderPath, aemMetadata) {
    var models = aemMetadata ? aemMetadata.models : {};
    var components = aemMetadata ? aemMetadata.components : [];
    return new Runtime()
        .setGlobal({ models: models, wcmmode: wcmmode, component: { properties: {} }, content: content })
        .withDomFactory(new Runtime.VDOMFactory(global_1.window.document.implementation).withKeepFragment(true))
        .withResourceLoader(new ResourceResolver_1["default"](content || {}, new ComponentLoader_1["default"](), components).createResourceLoader(resourceLoaderPath || '/'));
};
/**
 * Gets a generic error message that takes in story information for detailing
 * @param selectedStory
 * @param selectedKind
 */
var getErrorMessage = function (selectedStory, selectedKind) {
    return {
        title: "Expecting an HTL snippet or DOM node from the story: \"" + selectedStory + "\" of \"" + selectedKind + "\".",
        description: "Did you forget to return the HTL snippet from the story in the template parameter?\n \n                  Use \"template: <your snippet, node, or template>\" or when defining the story."
    };
};
/**
 * Function that creates and returns a decoration element based on the decration tag data provided
 * @param decorationTag
 * @param element
 */
var getDecorationElement = function (decorationTag, element) {
    var decorationElement;
    if (decorationTag) {
        var decorationElementType = Object.prototype.hasOwnProperty.call(decorationTag, PROPERTY_TAG_NAME)
            ? decorationTag.tagName
            : DIV_TAG;
        var decorationElementClass = Object.prototype.hasOwnProperty.call(decorationTag, PROPERTY_CSS_CLASSES)
            ? decorationTag.cssClasses
                .map(function (value) {
                return typeof value === 'function' ? value() : value;
            })
                .join(' ')
            : 'component';
        decorationElement = global_1.document.createElement(decorationElementType);
        decorationElement.setAttribute(ATTRIBUTE_CLASS, decorationElementClass);
        // eslint-disable-next-line no-unused-expressions
        typeof element === TYPE_STRING
            ? (decorationElement.innerHTML = element)
            : decorationElement.appendChild(element);
    }
    return decorationElement;
};
/**
 * Function that checks if the renderer should remount the component
 * @param forceRender
 * @param element
 * @param decorationElement
 */
var shouldRemount = function (forceRender, element, decorationElement) {
    return !(forceRender === true &&
        ((typeof element === TYPE_STRING && ROOT_ELEMENT.innerHTML === element) ||
            (element &&
                element.outerHTML &&
                ROOT_ELEMENT.firstChild &&
                (ROOT_ELEMENT.firstChild.outerHTML === element.outerHTML ||
                    (decorationElement &&
                        ROOT_ELEMENT.firstChild.outerHTML === decorationElement.outerHTML)))));
};
/**
 * Resets the root dom to an empty state
 */
var resetRoot = function () {
    ROOT_ELEMENT.innerHTML = '';
};
/**
 * Gets The HTL template
 * @param storyFn
 * @param resourceType
 * @param components
 */
var getTemplate = function (storyFn, resourceType, aemMetadata) { return __awaiter(void 0, void 0, void 0, function () {
    var template, components, info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, storyFn()];
            case 1:
                template = (_a.sent()).template;
                components = aemMetadata ? aemMetadata.components : [];
                info = resourceType ? new ComponentLoader_1["default"]().resolve(resourceType, components) : null;
                info = info && info.module ? info.module : "unable to load " + resourceType;
                return [2 /*return*/, !template ? info : template];
        }
    });
}); };
function renderMain(_a) {
    var storyFn = _a.storyFn, selectedKind = _a.selectedKind, selectedStory = _a.selectedStory, showMain = _a.showMain, showError = _a.showError, forceRender = _a.forceRender;
    return __awaiter(this, void 0, void 0, function () {
        var _b, resourceLoaderPath, resourceType, content, _c, aemMetadata, _d, wcmmode, runtime, template, element, _e, decorationTag, decorationElement;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, storyFn()];
                case 1:
                    _b = (_f.sent()), resourceLoaderPath = _b.resourceLoaderPath, resourceType = _b.resourceType, content = _b.content, _c = _b.aemMetadata, aemMetadata = _c === void 0 ? {} : _c, _d = _b.wcmmode, wcmmode = _d === void 0 ? {} : _d;
                    return [4 /*yield*/, createRuntime(wcmmode, content, resourceLoaderPath, aemMetadata)];
                case 2:
                    runtime = _f.sent();
                    return [4 /*yield*/, getTemplate(storyFn, resourceType, aemMetadata)];
                case 3:
                    template = _f.sent();
                    if (!(typeof template === TYPE_FUNCTION)) return [3 /*break*/, 5];
                    return [4 /*yield*/, template(runtime)];
                case 4:
                    _e = _f.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _e = template;
                    _f.label = 6;
                case 6:
                    element = _e;
                    decorationTag = aemMetadata ? aemMetadata.decorationTag : null;
                    showMain();
                    if ((ROOT_ELEMENT && element instanceof global_1.Node !== false) || typeof element === TYPE_STRING) {
                        decorationElement = getDecorationElement(decorationTag, element);
                        // Don't re-mount the element if it didn't change and neither did the story
                        if (shouldRemount(forceRender, element, decorationElement)) {
                            resetRoot();
                            if (decorationTag) {
                                ROOT_ELEMENT.appendChild(decorationElement);
                            }
                            else {
                                // eslint-disable-next-line no-unused-expressions
                                typeof element === TYPE_STRING
                                    ? (ROOT_ELEMENT.innerHTML = element)
                                    : ROOT_ELEMENT.appendChild(element);
                            }
                        }
                    }
                    else {
                        showError(getErrorMessage(selectedKind, selectedStory));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = renderMain;
