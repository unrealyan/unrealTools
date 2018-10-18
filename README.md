# unrealTools
## Install 
    npm install unreal-tools

## Example
    imprt {DateTool} from 'unreal-tools';

    const dateTool = new DateTool()

    let time = new Date()

    let ftime = dateTool.format('yyyy-MM-dd');

    // return 2018-10-18

## Api category
> Finance
    thousands(input:number|string):string
>


> Restful
    objectToQueryString(obj:object):any
    getParameter(name:string,all:string):string
    getParameterByName(name:string,url:string):any
>

>  DateTool
    format:any
>