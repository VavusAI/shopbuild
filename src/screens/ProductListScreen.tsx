import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';
import { PRODUCTS_MOCK } from '../mocks/products';
import ProductCard from '../components/ProductCard';

type ParamList = {
  ProductList: { title?: string; category?: string };
};

export default function ProductListScreen() {
  const { params } = useRoute<RouteProp<ParamList, 'ProductList'>>();
  const { title = 'Products', category } = params ?? {};

  const { data } = useQuery({
    queryKey: ['catalog'],
    queryFn: fetchCatalog,
    staleTime: 60_000,
  });

  const base: Product[] = useMemo(() => data?.products ?? PRODUCTS_MOCK, [data]);

  // normalize category from product
  const getCategory = (p: any): string => {
    return (
      p?.category ||
      p?.categoryName ||
      p?.collection ||
      p?.type ||
      p?.tags?.[0] ||
      'Other'
    );
  };

  const list = useMemo(() => {
    if (!category) return base;
    return base.filter((p) => getCategory(p) === category);
  }, [base, category]);

  return (
    <View style={styles.page}>
      <Text style={styles.h1}>{category || title}</Text>

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
