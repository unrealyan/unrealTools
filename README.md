# unrealTools
## Install 
    npm install unreal-tools

## Example
    imprt {DateTool} from 'unreal-tools';

    const dateTool = new DateTool()

    let time = new Date()

    let ftime = dateTool.format('yyyy-MM-dd');

    // return 2018-10-18

***

## Api category
| api category | api name | params/type | description |
| ------ | ------ | ------ | ------ |
| **`Finance`** | thousands | `string|number` | input 1000.009 output 1,000.009 |
| **`Restful`** | objectToQueryString | `object` | example" `{username:"unrealyan",password:"password"}` return `?username=unrealyan&password=password` |
| **`Restful`** | getParameter | `string` `string` |  |
| **`Restful`** | getParameterByName | `object` |  |
| **`DateTool`** | format | `date` | format('yyyy-MM-dd') 2018-10-18 |

---

> **Finance**
    ` thousands(input:number|string):string`
>


> **Restful**
    `objectToQueryString(obj:object):any`
    `getParameter(name:string,all:string):string`
    `getParameterByName(name:string,url:string):any`
>

>  **DateTool**
    `format:any`
>