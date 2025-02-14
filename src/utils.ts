export function formatCurrency(amount?: number) {
    return 'Rp. ' + amount?.toLocaleString('id-ID')
}

export function formatNumberWithDots(number?: number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function parseNumberFromDots(string: string) {
    return parseInt(string.replace(/\./g, ""), 10);
}