// src/mocks/catalog.ts
import type { Product } from '../types/shop';

const USD = 'USD';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Wireless Noise-Canceling Headphones',
    brand: 'AudioTech',
    images: [{ id: 'p1-img1', url: 'https://picsum.photos/seed/at1/600/600' }],
    rating: 4.6,
    ratingCount: 1243,
    minPrice: { amount: 19999, currency: USD },
    variants: [
      {
        id: 'p1-v1',
        price: { amount: 19999, currency: USD },
        compareAtPrice: { amount: 25999, currency: USD },
        inStock: true,
      },
    ],
  },
  {
    id: 'p2',
    title: 'Classic Analog Watch – Luxury Edition',
    brand: 'TimeKeeper Co',
    images: [{ id: 'p2-img1', url: 'https://picsum.photos/seed/tk1/600/600' }],
    rating: 4.4,
    ratingCount: 870,
    minPrice: { amount: 8999, currency: USD },
    variants: [
      {
        id: 'p2-v1',
        price: { amount: 8999, currency: USD },
        inStock: true,
      },
    ],
  },
  {
    id: 'p3',
    title: 'Performance Running Shoes – Pro Series',
    brand: 'SportPro',
    images: [{ id: 'p3-img1', url: 'https://picsum.photos/seed/sp1/600/600' }],
    rating: 4.5,
    ratingCount: 2341,
    minPrice: { amount: 12999, currency: USD },
    variants: [
      {
        id: 'p3-v1',
        price: { amount: 12999, currency: USD },
        compareAtPrice: { amount: 14999, currency: USD },
        inStock: true,
      },
    ],
  },
  {
    id: 'p4',
    title: 'Handcrafted Leather Tote Bag',
    brand: 'Artisan Leather',
    images: [{ id: 'p4-img1', url: 'https://picsum.photos/seed/al1/600/600' }],
    rating: 4.3,
    ratingCount: 423,
    minPrice: { amount: 14999, currency: USD },
    variants: [
      {
        id: 'p4-v1',
        price: { amount: 14999, currency: USD },
        inStock: true,
      },
    ],
    // Optional UI-only hint your card can read:
    // If Product doesn’t include `badge`, just omit it in strict builds.
    // badge: 'handmade' as any,
  },
  {
    id: 'p5',
    title: 'Designer Sunglasses – Polarized',
    brand: 'Vision Style',
    images: [{ id: 'p5-img1', url: 'https://picsum.photos/seed/vs1/600/600' }],
    rating: 4.2,
    ratingCount: 653,
    minPrice: { amount: 15999, currency: USD },
    variants: [
      {
        id: 'p5-v1',
        price: { amount: 15999, currency: USD },
        compareAtPrice: { amount: 19999, currency: USD },
        inStock: true,
      },
    ],
  },
  {
    id: 'p6',
    title: 'Smart Fitness Tracker with Heart Monitor',
    brand: 'FitGear',
    images: [{ id: 'p6-img1', url: 'https://picsum.photos/seed/fg1/600/600' }],
    rating: 4.1,
    ratingCount: 987,
    minPrice: { amount: 7999, currency: USD },
    variants: [
      {
        id: 'p6-v1',
        price: { amount: 7999, currency: USD },
        inStock: true,
      },
    ],
  },
];
