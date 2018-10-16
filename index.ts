class unrealTools {
    
    thousands = (input: number) => {
        return input && input.toString()
            .replace(/(^|\s)\d+/g, (m: string) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
}

export default unrealTools;