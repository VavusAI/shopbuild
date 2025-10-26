import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';
import { PRODUCTS_MOCK } from '../mocks/products';
import ProductCard from '../components/ProductCard';

type ParamList = {
  ProductList: { title?: string; category?: string; subcategory?: string };
};

function norm(s?: string) { return (s ?? '').toLowerCase(); }
function allTextOfProduct(p: any): string {
  const bits: string[] = [];
  bits.push(p?.title, p?.brand, p?.category, p?.categoryName, p?.collection, p?.type);
  if (Array.isArray(p?.tags)) bits.push(...p.tags);
  if (Array.isArray(p?.attributes)) bits.push(...p.attributes.map((a: any) => a?.name));
  return norm(bits.filter(Boolean).join(' '));
}
const regBySlug = (slug: string) =>
  new RegExp(slug.replace(/-/g, '[-\\s_]?').replace('&', '(?:&|and)'), 'i');

export default function ProductListScreen() {
  const { params } = useRoute<RouteProp<ParamList, 'ProductList'>>();
  const { title = 'Products', category, subcategory } = params ?? {};

  const { data } = useQuery({ queryKey: ['catalog'], queryFn: fetchCatalog, staleTime: 60_000 });
  const base: Product[] = useMemo(() => data?.products ?? PRODUCTS_MOCK, [data]);

  const list = useMemo(() => {
    if (!category && !subcategory) return base;

    const catSlug = category ? category.toLowerCase().replace(/\s+/g, '-').replace('&', 'and') : null;
    const subSlug = subcategory ?? null;

    return base.filter((p) => {
      const txt = allTextOfProduct(p);
      if (subSlug) return regBySlug(subSlug).test(txt);
      if (catSlug) return regBySlug(catSlug).test(txt);
      return true;
    });
  }, [base, category, subcategory]);

  return (
    <View style={styles.page}>
      <Text style={styles.h1}>{subcategory ? title : (category || title)}</Text>
      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.pad}
        renderItem={({ item }) => (
          <View style={styles.cardWrap}>
            <ProductCard
              id={item.id}
              image={item.images?.[0]?.url ?? (item as any).image ?? ''}
              title={item.title}
              price={item?.variants?.[0]?.price?.amount ?? item?.minPrice?.amount ?? 0}
              originalPrice={item?.variants?.[0]?.compareAtPrice?.amount ?? undefined}
              rating={item.rating ?? 0}
              reviewCount={item.ratingCount ?? 0}
              seller={item.brand ?? 'Seller'}
              stockLevel={item?.variants?.[0]?.inStock ? 'in-stock' : 'out-of-stock'}
              badge={(item as any).badge}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  h1: { fontSize: 20, fontWeight: '800', color: '#111', paddingHorizontal: 12, paddingTop: 12 },
  pad: { paddingHorizontal: 12, paddingBottom: 20, rowGap: 12 },
  row: { gap: 12 },
  cardWrap: { flex: 1 },
});
