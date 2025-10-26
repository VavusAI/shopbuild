export type Money = { amount: number; currency: string };

export type ImageAsset = {
  id: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type Variant = {
  id: string;
  sku?: string;
  title?: string;
  price: Money;
  compareAtPrice?: Money | null;
  inStock: boolean;
};

export type Product = {
  id: string;
  title: string;
  slug?: string;
  brand?: string;
  rating?: number;       // 0..5
  ratingCount?: number;  // number of reviews
  images: ImageAsset[];
  minPrice?: Money;      // optional, if API returns range
  maxPrice?: Money;      // optional
  variants: Variant[];
  badges?: string[];
};

export type CatalogResponse = {
  products: Product[];
  nextCursor?: string | null;
};
