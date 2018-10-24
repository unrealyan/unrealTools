export default class Finance {
    constructor() {
        // 金额千分位
        this.thousands = (input) => {
            return input && input.toString()
                .replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
        };
    }
}
