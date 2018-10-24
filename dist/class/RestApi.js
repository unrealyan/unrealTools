var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HttpClient", "./RestUrl"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HttpClient_1 = require("./HttpClient");
    var RestUrl_1 = require("./RestUrl");
    var rest = new RestUrl_1.default();
    var httpClient = new HttpClient_1.default("/index.html");
    var RestApi = /** @class */ (function () {
        function RestApi(entityName, servicePath, options) {
            var _this = this;
            this.removeEmptyParams = function (obj) {
                for (var propName in obj) {
                    if (obj[propName] === "" ||
                        obj[propName] === null ||
                        obj[propName] === undefined) {
                        delete obj[propName];
                    }
                }
            };
            this.entityName = entityName;
            this.servicePath = servicePath || "/api";
            this.options = Object.assign({
                removeEmpty: true,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    token: sessionStorage.getItem("token")
                }
            }, options);
            this.find = function (method, params) { return __awaiter(_this, void 0, void 0, function () {
                var url, resp, json, rej_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.options.removeEmpty) {
                                this.removeEmptyParams(params);
                            }
                            url = this.serverApiPath + "/" + this.entityName + "/" + method + "?" + rest.objectToQueryString(params);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, httpClient.get(url, this.options.headers)];
                        case 2:
                            resp = _a.sent();
                            json = JSON.parse(resp);
                            if (json.code === 0) {
                                return [2 /*return*/, Promise.resolve(json)];
                            }
                            else if (json.error_code === 201) {
                                this.redirectLogin();
                                return [2 /*return*/, false];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            rej_1 = _a.sent();
                            return [2 /*return*/, Promise.reject(rej_1)];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            this.command = function (method, params) { return __awaiter(_this, void 0, void 0, function () {
                var url, resp, resp_1_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.serverApiPath + "/" + this.entityName + "/" + method;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, httpClient.post(url, params, this.optins.headers)];
                        case 2:
                            resp = _a.sent();
                            return [2 /*return*/, JSON.parse(resp)];
                        case 3:
                            resp_1_1 = _a.sent();
                            return [2 /*return*/, Promise.reject(JSON.parse(resp_1_1))];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            this.update = function (id, entity) { return __awaiter(_this, void 0, void 0, function () {
                var url, resp, resp_1_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.serverApiPath + "/" + this.entityName + "/" + id;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, httpClient.put(url, JSON.stringify(entity), this.optins.headers)];
                        case 2:
                            resp = _a.sent();
                            return [2 /*return*/, JSON.parse(resp)];
                        case 3:
                            resp_1_2 = _a.sent();
                            return [2 /*return*/, Promise.reject(JSON.parse(resp_1_2))];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            this.delete = function (id) { return __awaiter(_this, void 0, void 0, function () {
                var url, resp, resp_1_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this.serverApiPath + "/" + this.entityName + "/" + id;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, httpClient.delete(url, this.optins.headers)];
                        case 2:
                            resp = _a.sent();
                            return [2 /*return*/, JSON.parse(resp)];
                        case 3:
                            resp_1_3 = _a.sent();
                            return [2 /*return*/, Promise.reject(JSON.parse(resp_1_3))];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
        }
        ;
        return RestApi;
    }());
    exports.default = RestApi;
});
