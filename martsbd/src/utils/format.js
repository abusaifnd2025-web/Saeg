const currencyFormatter = new Intl.NumberFormat('bn-BD', {
  style: 'currency',
  currency: 'BDT',
  minimumFractionDigits: 0,
})

export const formatCurrency = (amount) => currencyFormatter.format(amount)

export const formatDate = (timestamp) => {
  if (!timestamp) return '—'

  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
  return new Intl.DateTimeFormat('bn-BD', {
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: true,
  }).format(date)
}
