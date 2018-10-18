(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./class/finance", "./class/restful", "./class/date"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var finance_1 = require("./class/finance");
    exports.Finance = finance_1.default;
    var restful_1 = require("./class/restful");
    exports.Restful = restful_1.default;
    var date_1 = require("./class/date");
    exports.DateTool = date_1.default;
});
