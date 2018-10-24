(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./class/Finance", "./class/RestUrl", "./class/Date", "./class/RestApi"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Finance_1 = require("./class/Finance");
    exports.Finance = Finance_1.default;
    var RestUrl_1 = require("./class/RestUrl");
    exports.Restful = RestUrl_1.default;
    var Date_1 = require("./class/Date");
    exports.DateTool = Date_1.default;
    var RestApi_1 = require("./class/RestApi");
    exports.RestApi = RestApi_1.default;
});
