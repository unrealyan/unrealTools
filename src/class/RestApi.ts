import HttpClient from "./HttpClient";
import restUrl from "./RestUrl";

let rest = new restUrl();
let httpClient = new HttpClient("/index.html")

export default class RestApi {
  [x: string]: any;
  constructor(entityName, servicePath, options) {
    this.entityName = entityName;
    this.servicePath = servicePath || "/api";
    this.options = Object.assign(
      {
        removeEmpty: true,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          token: sessionStorage.getItem("token")
        }
      },
      options
    );

    this.find = async (method, params) => {
      if (this.options.removeEmpty) {
        this.removeEmptyParams(params);
      }
      let url = `${this.serverApiPath}/${
        this.entityName
      }/${method}?${rest.objectToQueryString(params)}`;
      try {
        const resp: any = await httpClient.get(url, this.options.headers);
        let json: any = JSON.parse(resp);
        if (json.code === 0) {
          return Promise.resolve(json);
        } else if (json.error_code === 201) {
          this.redirectLogin();
          return false;
        }
      } catch (rej) {
        return Promise.reject(rej);
      }
    };

    this.command = async (method,params)=>{
        let url = `${this.serverApiPath}/${
            this.entityName
          }/${method}`;
        try {
            const resp:any = await httpClient.post(url, params, this.optins.headers);
            return JSON.parse(resp);
        }
        catch (resp_1) {
            return Promise.reject(JSON.parse(resp_1));
        }
    };

    this.update = async (id, entity) => {
        let url = `${this.serverApiPath}/${this.entityName}/${id}`;
        try {
              const resp:any = await httpClient.put(url, JSON.stringify(entity), this.optins.headers);
              return JSON.parse(resp);
          }
          catch (resp_1) {
              return Promise.reject(JSON.parse(resp_1));
          }
      };
      this.delete = async id => {
        let url = `${this.serverApiPath}/${this.entityName}/${id}`;
        try {
              const resp:any = await httpClient.delete(url, this.optins.headers);
              return JSON.parse(resp);
          }
          catch (resp_1) {
              return Promise.reject(JSON.parse(resp_1));
          }
      };
  };

  

  removeEmptyParams = (obj: object) => {
    for (var propName in obj) {
      if (
        obj[propName] === "" ||
        obj[propName] === null ||
        obj[propName] === undefined
      ) {
        delete obj[propName];
      }
    }
  };
}
