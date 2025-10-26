import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';
import { PRODUCTS_MOCK } from '../mocks/products';
import ProductCard from '../components/ProductCard';
import { AMAZON_KEYWORDS } from '../constants/taxonomy.amazon';

type ParamList = {
  ProductList: { title?: string; category?: string; subcategory?: string };
};

function textOf(p: any) {
  const parts: string[] = [];
  parts.push(p?.title, p?.brand, p?.category, p?.categoryName, p?.collection, p?.type);
  if (Array.isArray(p?.tags)) parts.push(...p.tags);
  if (Array.isArray(p?.attributes)) parts.push(...p.attributes.map((a: any) => a?.name));
  return parts.filter(Boolean).join(' ').toLowerCase();
}

export default function ProductListScreen() {
  const { params } = useRoute<RouteProp<ParamList, 'ProductList'>>();
  const { title = 'Products', category, subcategory } = params ?? {};

  const { data } = useQuery({ queryKey: ['catalog'], queryFn: fetchCatalog, staleTime: 60_000 });
  const all: Product[] = useMemo(() => data?.products ?? PRODUCTS_MOCK, [data]);

  const list = useMemo(() => {
    if (!category && !subcategory) return all;

    const kw = AMAZON_KEYWORDS[category ?? ''] ?? [];
    const subWords = (subcategory ?? '')
      .toLowerCase()
      .replace(/-/g, ' ')
      .split(/\s+/)
      .filter(Boolean);

    return all.filter(p => {
      const t = textOf(p);
      if (subWords.length && subWords.some(w => t.includes(w))) return true;
      if (kw.length && kw.some(w => t.includes(w))) return true;
      return false;
    });
  }, [all, category, subcategory]);

  return (
    <View style={styles.page}>
      <Text style={styles.h1}>{title}</Text>
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
