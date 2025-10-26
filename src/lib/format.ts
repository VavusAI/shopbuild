import type { Money } from '../types/shop';

export const formatCurrency = (m: Money | undefined) => {
  if (!m) return '';
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: m.currency || 'USD',
      maximumFractionDigits: 2,
    }).format(m.amount / 100);
  } catch {
    return `${(m.amount / 100).toFixed(2)} ${m.currency}`;
  }
};

// choose best price to show on cards
export const primaryPrice = (variantsOrMin?: { price: Money }[] | Money) => {
  if (!variantsOrMin) return undefined;
  if (Array.isArray(variantsOrMin)) return variantsOrMin[0]?.price;
  return variantsOrMin;
};
