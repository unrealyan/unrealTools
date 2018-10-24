(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Finance = /** @class */ (function () {
        function Finance() {
            // 金额千分位
            this.thousands = function (input) {
                return input && input.toString()
                    .replace(/(^|\s)\d+/g, function (m) { return m.replace(/(?=(?!\b)(\d{3})+$)/g, ','); });
            };
        }
        return Finance;
    }());
    exports.default = Finance;
});
