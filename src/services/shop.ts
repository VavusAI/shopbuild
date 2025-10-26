import { api } from '../lib/api';
import type { Product } from '../types/shop';
import { MOCK_PRODUCTS } from '../mocks/catalog';

type CatalogResponse = { products: Product[] };

export async function fetchCatalog(): Promise<CatalogResponse> {
  try {
    const res = await api.get<CatalogResponse>('/catalog');
    const products = Array.isArray(res.data?.products) ? res.data.products : [];
    return { products: products.length ? products : MOCK_PRODUCTS };
  } catch {
    return { products: MOCK_PRODUCTS };
  }
}
