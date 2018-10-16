"use strict";
exports.__esModule = true;
var unrealTools = /** @class */ (function () {
    function unrealTools() {
        this.thousands = function (input) {
            return input && input.toString()
                .replace(/(^|\s)\d+/g, function (m) { return m.replace(/(?=(?!\b)(\d{3})+$)/g, ','); });
        };
    }
    return unrealTools;
}());
exports["default"] = unrealTools;
