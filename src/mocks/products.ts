// src/mocks/products.ts
import type { Product } from '../types/shop';

const USD = 'USD';

export const PRODUCTS_MOCK: Product[] = [
  {
    id: 'm1',
    title: 'Wireless Headphones with Noise Cancellation',
    brand: 'AudioTech',
    images: [{ id: 'm1-img1', url: 'https://picsum.photos/seed/phones/800/800' }],
    rating: 4.7,
    ratingCount: 1243,
    minPrice: { amount: 19999, currency: USD },
    variants: [
      {
        id: 'm1-v1',
        price: { amount: 19999, currency: USD },
        compareAtPrice: { amount: 25999, currency: USD },
        inStock: true,
      },
    ],
  },
  {
    id: 'm2',
    title: 'Classic Analog Watch – Luxury Edition',
    brand: 'TimeKeeper Co',
    images: [{ id: 'm2-img1', url: 'https://picsum.photos/seed/watch/800/800' }],
    rating: 4.5,
    ratingCount: 870,
    minPrice: { amount: 8999, currency: USD },
    variants: [{ id: 'm2-v1', price: { amount: 8999, currency: USD }, inStock: true }],
  },
  {
    id: 'm3',
    title: 'Performance Running Shoes – Pro Series',
    brand: 'SportPro',
    images: [{ id: 'm3-img1', url: 'https://picsum.photos/seed/shoes/800/800' }],
    rating: 4.6,
    ratingCount: 2341,
    minPrice: { amount: 12999, currency: USD },
    variants: [
      {
        id: 'm3-v1',
        price: { amount: 12999, currency: USD },
        compareAtPrice: { amount: 15999, currency: USD },
        inStock: true,
      },
    ],
  },
  {
    id: 'm4',
    title: 'Handcrafted Leather Tote Bag',
    brand: 'Artisan Leather',
    images: [{ id: 'm4-img1', url: 'https://picsum.photos/seed/bag/800/800' }],
    rating: 4.8,
    ratingCount: 423,
    minPrice: { amount: 14999, currency: USD },
    variants: [{ id: 'm4-v1', price: { amount: 14999, currency: USD }, inStock: true }],
    // If you want a UI-only badge and Product doesn't include it, you can
    // cast when using: `{ ...(item as any), badge: 'handmade' }`
  },
  {
    id: 'm5',
    title: 'Designer Sunglasses – Polarized',
    brand: 'Vision Style',
    images: [{ id: 'm5-img1', url: 'https://picsum.photos/seed/sunglasses/800/800' }],
    rating: 4.4,
    ratingCount: 653,
    minPrice: { amount: 15999, currency: USD },
    variants: [
      {
        id: 'm5-v1',
        price: { amount: 15999, currency: USD },
        compareAtPrice: { amount: 18999, currency: USD },
        inStock: true,
      },
    ],
  },
  {
    id: 'm6',
    title: 'Premium Wireless Earbuds',
    brand: 'AudioTech',
    images: [{ id: 'm6-img1', url: 'https://picsum.photos/seed/earbuds/800/800' }],
    rating: 4.3,
    ratingCount: 987,
    minPrice: { amount: 7999, currency: USD },
    variants: [{ id: 'm6-v1', price: { amount: 7999, currency: USD }, inStock: true }],
  },
  {
    id: 'm7',
    title: 'Smart Fitness Tracker',
    brand: 'FitGear',
    images: [{ id: 'm7-img1', url: 'https://picsum.photos/seed/tracker/800/800' }],
    rating: 4.2,
    ratingCount: 1203,
    minPrice: { amount: 7999, currency: USD },
    variants: [{ id: 'm7-v1', price: { amount: 7999, currency: USD }, inStock: true }],
  },
  {
    id: 'm8',
    title: 'Home Espresso Machine',
    brand: 'CaffèWorks',
    images: [{ id: 'm8-img1', url: 'https://picsum.photos/seed/espresso/800/800' }],
    rating: 4.6,
    ratingCount: 512,
    minPrice: { amount: 24999, currency: USD },
    variants: [{ id: 'm8-v1', price: { amount: 24999, currency: USD }, inStock: true }],
  },
];

export default PRODUCTS_MOCK;
