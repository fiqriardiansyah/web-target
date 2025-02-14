export function formatCurrency(amount?: number) {
    return 'Rp. ' + amount?.toLocaleString('id-ID')
}

export function formatNumberWithDots(number?: number) {
    if (!number) return '0'
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function parseNumberFromDots(string?: string) {
    if (!string) return 0;
    return parseInt(string.replace(/\./g, ""), 10);
}