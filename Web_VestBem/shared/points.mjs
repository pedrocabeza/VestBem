export const POINTS_PER_ITEM = 10
export const MAX_DONATION_ITEMS = 10000

export function donationPoints(quantity) {
  const value = typeof quantity === 'string' && /^\d+$/.test(quantity) ? Number(quantity) : quantity
  if (!Number.isSafeInteger(value) || value < 1 || value > MAX_DONATION_ITEMS) return 0
  return value * POINTS_PER_ITEM
}
