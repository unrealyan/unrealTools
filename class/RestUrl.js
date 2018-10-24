export default class RestUrl {
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
