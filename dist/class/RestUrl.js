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
    var Restful = /** @class */ (function () {
        function Restful() {
            this.getParameter = function (name, all) {
                var query = window.location.search.substring(1);
                var vars = query.split('&');
                var queryString = {};
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split('=');
                    // If first entry with this name
                    if (typeof queryString[pair[0]] === 'undefined') {
                        queryString[pair[0]] = decodeURIComponent(pair[1]);
                        // If second entry with this name
                    }
                    else if (typeof queryString[pair[0]] === 'string') {
                        var arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
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
            this.getParameterByName = function (name, url) {
                if (!url)
                    url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
                if (!results)
                    return null;
                if (!results[2])
                    return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            };
        }
        Restful.prototype.objectToQueryString = function (obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return "?" + str.join("&");
        };
        return Restful;
    }());
    exports.default = Restful;
});
