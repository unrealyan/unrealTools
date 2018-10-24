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
