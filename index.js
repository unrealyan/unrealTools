var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("class/Finance", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Finance {
        constructor() {
            // 金额千分位
            this.thousands = (input) => {
                return input && input.toString()
                    .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
            };
        }
    }
    exports.default = Finance;
});
define("class/RestUrl", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Restful {
        constructor() {
            this.getParameter = (name, all) => {
                const query = window.location.search.substring(1);
                let vars = query.split('&');
                let queryString = {};
                for (let i = 0; i < vars.length; i++) {
                    let pair = vars[i].split('=');
                    // If first entry with this name
                    if (typeof queryString[pair[0]] === 'undefined') {
                        queryString[pair[0]] = decodeURIComponent(pair[1]);
                        // If second entry with this name
                    }
                    else if (typeof queryString[pair[0]] === 'string') {
                        let arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
                        queryString[pair[0]] = arr;
                        // If third or later entry with this name
                    }
                    else {
                        queryString[pair[0]].push(decodeURIComponent(pair[1]));
                    }
                }
                if (all === 'all') {
                    return queryString;
                }
                else {
                    return queryString[name];
                }
            };
            this.getParameterByName = (name, url) => {
                if (!url)
                    url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
                if (!results)
                    return null;
                if (!results[2])
                    return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            };
        }
        objectToQueryString(obj) {
            let str = [];
            for (let p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return `?${str.join("&")}`;
        }
    }
    exports.default = Restful;
});
define("class/Date", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DateTool {
        format(date, fmt) {
            let o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }
    exports.default = DateTool;
});
define("class/HttpClient", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const executeRequest = (url, method, headers, data) => new Promise((resole, reject) => {
        let xhr = new XMLHttpRequest();
        if (headers && headers['Authorization']) {
            xhr.withCredentials = true;
        }
        xhr.open(method, url, true);
        xhr.onerror = (e) => {
            try {
                const resp = xhr.responseText;
                reject({ type: 'XHR_ERROR', message: resp });
            }
            catch (e) {
                reject({ type: 'XHR_ERROR', message: e.message });
            }
        };
        xhr.onreadystatechange = (e) => {
            try {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                    const resp = xhr.responseText;
                    resole(resp);
                }
                else if (xhr.readyState == 4 && xhr.status == 401) {
                    let data = JSON.parse(xhr.response);
                    let login = data.data.sysUserDto.adminSystemDomain;
                    sessionStorage.clear();
                    let url = `${login}/index.html`;
                    location.href = url;
                    const resp = xhr.responseText;
                    reject(resp);
                }
                else if (xhr.readyState == 2 && xhr.status == 401) {
                    // let data = JSON.parse(xhr.response);
                    // let login = data.sysUserDto.adminSystemDomain;
                    // let url = `${login}/index.html`;
                    // location.href = url;
                    // const resp = xhr.responseText;
                    // reject(resp);
                }
                else if (xhr.readyState == 4) {
                    const resp = xhr.responseText;
                    reject(resp);
                }
            }
            catch (e) {
                reject({ type: 'FINISH_ERROR', message: e.message });
            }
        };
        if (headers) {
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        xhr.send(data);
    });
    class HttpClient {
        constructor(login) {
            this.login = login;
        }
        get(url, headers) {
            return executeRequest(url, 'GET', headers, null);
        }
        post(url, data, headers) {
            return executeRequest(url, 'POST', headers, data);
        }
        put(url, data, headers) {
            return executeRequest(url, 'PUT', headers, data);
        }
        delete(url, headers) {
            return executeRequest(url, 'DELETE', headers, null);
        }
    }
    exports.default = HttpClient;
});
define("class/RestApi", ["require", "exports", "class/HttpClient", "class/RestUrl"], function (require, exports, HttpClient_1, RestUrl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
define("index", ["require", "exports", "class/Finance", "class/RestUrl", "class/Date", "class/RestApi"], function (require, exports, Finance_1, RestUrl_2, Date_1, RestApi_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Finance = Finance_1.default;
    exports.Restful = RestUrl_2.default;
    exports.DateTool = Date_1.default;
    exports.RestApi = RestApi_1.default;
});
