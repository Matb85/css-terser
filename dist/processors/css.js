"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var expressions_1 = __importDefault(require("../utils/expressions"));
function default_1(file, classLibrary, idLibrary) {
    var selectorNameMatch = expressions_1["default"].selectorName;
    file = file.replace(expressions_1["default"].classSelector, function (selector) {
        if (selector[selector.length - 1] === ")") {
            return selector;
        }
        return selector.replace(selectorNameMatch, function (selectorName) {
            return classLibrary.get(selectorName, true);
        });
    });
    file = file.replace(expressions_1["default"].idSelector, function (selector) {
        if (selector[selector.length - 1] === ";" || selector[selector.length - 1] === "}") {
            return selector;
        }
        return selector.replace(selectorNameMatch, function (selectorName) {
            return idLibrary.get(selectorName, true);
        });
    });
    return file;
}
exports["default"] = default_1;
