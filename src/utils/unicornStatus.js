export function getUnicornStatus(age) {
  const n = Number(age)
  if (Number.isNaN(n) || n < 0) return 'Unknown'
  if (n <= 8) return 'Baby Unicorn'
  if (n <= 25) return 'Mature Unicorn'
  return 'Old Unicorn'
}


