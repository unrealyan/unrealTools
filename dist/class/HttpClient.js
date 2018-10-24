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
    var executeRequest = function (url, method, headers, data) { return new Promise(function (resole, reject) {
        var xhr = new XMLHttpRequest();
        if (headers && headers['Authorization']) {
            xhr.withCredentials = true;
        }
        xhr.open(method, url, true);
        xhr.onerror = function (e) {
            try {
                var resp = xhr.responseText;
                reject({ type: 'XHR_ERROR', message: resp });
            }
            catch (e) {
                reject({ type: 'XHR_ERROR', message: e.message });
            }
        };
        xhr.onreadystatechange = function (e) {
            try {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                    var resp = xhr.responseText;
                    resole(resp);
                }
                else if (xhr.readyState == 4 && xhr.status == 401) {
                    var data_1 = JSON.parse(xhr.response);
                    var login = data_1.data.sysUserDto.adminSystemDomain;
                    sessionStorage.clear();
                    var url_1 = login + "/index.html";
                    location.href = url_1;
                    var resp = xhr.responseText;
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
                    var resp = xhr.responseText;
                    reject(resp);
                }
            }
            catch (e) {
                reject({ type: 'FINISH_ERROR', message: e.message });
            }
        };
        if (headers) {
            for (var key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        xhr.send(data);
    }); };
    var HttpClient = /** @class */ (function () {
        function HttpClient(login) {
            this.login = login;
        }
        HttpClient.prototype.get = function (url, headers) {
            return executeRequest(url, 'GET', headers, null);
        };
        HttpClient.prototype.post = function (url, data, headers) {
            return executeRequest(url, 'POST', headers, data);
        };
        HttpClient.prototype.put = function (url, data, headers) {
            return executeRequest(url, 'PUT', headers, data);
        };
        HttpClient.prototype.delete = function (url, headers) {
            return executeRequest(url, 'DELETE', headers, null);
        };
        return HttpClient;
    }());
    exports.default = HttpClient;
});
