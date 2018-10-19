interface func{
    thousands(input:number|string):string
}
export default class Finance implements func{
    // 金额千分位
    thousands = (input: string):string => {
        return input && input.toString()
            .replace(/(^|\s)\d+/g, (m: string) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
}