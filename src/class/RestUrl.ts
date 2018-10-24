interface Func{
    objectToQueryString(obj:object):any
    getParameter(name:string,all:string):string
    getParameterByName(name:string,url:string):any
}

export default class RestUrl implements Func{
    objectToQueryString (obj:any) {
        let str:any = [];
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return `?${str.join("&")}`;
    }

    getParameter = (name:string,all:string):string => {
        const query = window.location.search.substring(1);
        let vars = query.split('&');
        let queryString:any = {};
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            // If first entry with this name
            if (typeof queryString[pair[0]] === 'undefined') {
                queryString[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof queryString[pair[0]] === 'string') {
                let arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
                queryString[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                queryString[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        if(all === 'all') {
            return queryString;
        } else {
            return queryString[name];
        }
    }

    getParameterByName = (name:string, url:string):any => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}
