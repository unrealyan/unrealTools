"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./HttpClient");
const RestUrl_1 = require("./RestUrl");
let rest = new RestUrl_1.default();
let httpClient = new HttpClient_1.default("/index.html");
class RestApi {
    constructor(entityName, servicePath, options) {
        this.removeEmptyParams = (obj) => {
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
        this.find = (method, params) => __awaiter(this, void 0, void 0, function* () {
            if (this.options.removeEmpty) {
                this.removeEmptyParams(params);
            }
            let url = `${this.serverApiPath}/${this.entityName}/${method}?${rest.objectToQueryString(params)}`;
            try {
                const resp = yield httpClient.get(url, this.options.headers);
                let json = JSON.parse(resp);
                if (json.code === 0) {
                    return Promise.resolve(json);
                }
                else if (json.error_code === 201) {
                    this.redirectLogin();
                    return false;
                }
            }
            catch (rej) {
                return Promise.reject(rej);
            }
        });
        this.command = (method, params) => __awaiter(this, void 0, void 0, function* () {
            let url = `${this.serverApiPath}/${this.entityName}/${method}`;
            try {
                const resp = yield httpClient.post(url, params, this.optins.headers);
                return JSON.parse(resp);
            }
            catch (resp_1) {
                return Promise.reject(JSON.parse(resp_1));
            }
        });
        this.update = (id, entity) => __awaiter(this, void 0, void 0, function* () {
            let url = `${this.serverApiPath}/${this.entityName}/${id}`;
            try {
                const resp = yield httpClient.put(url, JSON.stringify(entity), this.optins.headers);
                return JSON.parse(resp);
            }
            catch (resp_1) {
                return Promise.reject(JSON.parse(resp_1));
            }
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            let url = `${this.serverApiPath}/${this.entityName}/${id}`;
            try {
                const resp = yield httpClient.delete(url, this.optins.headers);
                return JSON.parse(resp);
            }
            catch (resp_1) {
                return Promise.reject(JSON.parse(resp_1));
            }
        });
    }
    ;
}
exports.default = RestApi;
