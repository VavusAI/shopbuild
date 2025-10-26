// src/constants/megaMenu.ts
export interface Subcategory {
  name: string;
  slug: string;
}
export interface TopCategory {
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export const MEGA_CATEGORIES: TopCategory[] = [
  {
    name: 'Electronics',
    slug: 'electronics',
    subcategories: [
      { name: 'Phones & Tablets', slug: 'phones-tablets' },
      { name: 'Laptops & Computers', slug: 'laptops-computers' },
      { name: 'TV & Audio', slug: 'tv-audio' },
      { name: 'Cameras', slug: 'cameras' },
      { name: 'Wearables', slug: 'wearables' },
      { name: 'Gaming', slug: 'gaming' },
    ],
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    subcategories: [
      { name: "Women's Clothing", slug: 'womens-clothing' },
      { name: "Men's Clothing", slug: 'mens-clothing' },
      { name: 'Shoes', slug: 'shoes' },
      { name: 'Bags & Accessories', slug: 'bags-accessories' },
      { name: 'Jewelry', slug: 'jewelry' },
      { name: 'Watches', slug: 'watches' },
    ],
  },
  {
    name: 'Home & Garden',
    slug: 'home-garden',
    subcategories: [
      { name: 'Furniture', slug: 'furniture' },
      { name: 'Kitchen & Dining', slug: 'kitchen-dining' },
      { name: 'Bedding & Bath', slug: 'bedding-bath' },
      { name: 'Home Decor', slug: 'home-decor' },
      { name: 'Garden & Outdoor', slug: 'garden-outdoor' },
      { name: 'Tools & Hardware', slug: 'tools-hardware' },
    ],
  },
  {
    name: 'Beauty & Health',
    slug: 'beauty-health',
    subcategories: [
      { name: 'Makeup', slug: 'makeup' },
      { name: 'Skincare', slug: 'skincare' },
      { name: 'Haircare', slug: 'haircare' },
      { name: 'Fragrances', slug: 'fragrances' },
      { name: 'Health & Wellness', slug: 'health-wellness' },
      { name: 'Personal Care', slug: 'personal-care' },
    ],
  },
  {
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    subcategories: [
      { name: 'Exercise & Fitness', slug: 'exercise-fitness' },
      { name: 'Outdoor Recreation', slug: 'outdoor-recreation' },
      { name: 'Sports Equipment', slug: 'sports-equipment' },
      { name: 'Cycling', slug: 'cycling' },
      { name: 'Water Sports', slug: 'water-sports' },
      { name: 'Winter Sports', slug: 'winter-sports' },
    ],
  },
];

/** Small, nice-looking emoji per top category (no native icons needed) */
export const CATEGORY_EMOJI: Record<string, string> = {
  'electronics': '📱',
  'fashion': '👗',
  'home-garden': '🏡',
  'beauty-health': '💄',
  'sports-outdoors': '🏅',
  'other': '🛍️',
};
