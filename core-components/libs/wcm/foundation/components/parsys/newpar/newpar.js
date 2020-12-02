/*******************************************************************************
 * Copyright 2016 Adobe Systems Incorporated
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
"use strict";

var global = this;

use(function () {
    
    var _retrieveAttribute = function (attrName, defaultValue) {
        var value = defaultValue;
        if (global.request
                && global.request.getAttribute
                && global.request.getAttribute(attrName)) {
            value = global.request.getAttribute(attrName);
        }
        
        return value;
    }
    
    var _getEditContext = function () {
        var editContext = undefined;
        var componentContext = _retrieveAttribute("com.day.cq.wcm.componentcontext");
        if (componentContext) {
            editContext = componentContext.getEditContext();
        }
        
        return editContext;
    }
    
    var editContext = _getEditContext();
    
    if (editContext
            && editContext.getParent
            && editContext.getParent() != null) {
        var parentContext = editContext.getParent();
        
        var curRes = editContext.getParent().getAttribute("currentResource");
        if (curRes != null) {
            var prev = global.Packages.com.day.text.Text.getName(curRes.getPath());
            editContext.getEditConfig().setInsertBehavior("before " + prev);
        }
    }
    
    return {};
});
