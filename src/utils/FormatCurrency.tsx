const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
})

export function formatCurrency(number: any) {
  return CURRENCY_FORMATTER.format(number)
}

export function numberWithCommas(number: any) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
