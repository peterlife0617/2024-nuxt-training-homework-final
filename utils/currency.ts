export function formatCurrency(amount?: number, prefix: string = 'NT$'): string {
  if (amount === undefined) {
    return ''
  }

  const numberStr = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${prefix} ${numberStr}`
}
