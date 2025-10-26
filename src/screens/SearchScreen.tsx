import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import TopSearchBar from '../components/TopSearchBar';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/Skeletons/ProductCardSkeleton';
import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';
import { PRODUCTS_MOCK } from '../mocks/products';

export default function SearchScreen() {
  const [q, setQ] = useState('');
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['catalog'],
    queryFn: fetchCatalog,
    staleTime: 60_000,
  });

  const list: Product[] = data?.products ?? PRODUCTS_MOCK;
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return list;
    return list.filter(p =>
      [p.title, p.brand].filter(Boolean).some(t => t!.toLowerCase().includes(needle)),
    );
  }, [list, q]);

  return (
    <FlatList
      ListHeaderComponent={<TopSearchBar value={q} onChangeText={setQ} />}
      data={isLoading ? Array.from({ length: 6 }) as any : filtered}
      keyExtractor={(item: any, i) => (item?.id ?? `s-${i}`)}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ paddingHorizontal: 12, gap: 12, paddingBottom: 24 }}
      renderItem={({ item }) =>
        isLoading ? (
          <View style={{ flex: 1 }}><ProductCardSkeleton /></View>
        ) : (
          <View style={{ flex: 1 }}>
            <ProductCard
              id={item.id}
              image={item.images?.[0]?.url ?? ''}
              title={item.title}
              price={item?.variants?.[0]?.price?.amount ?? item?.minPrice?.amount ?? 0}
              originalPrice={item?.variants?.[0]?.compareAtPrice?.amount ?? undefined}
              rating={item.rating ?? 0}
              reviewCount={item.ratingCount ?? 0}
              seller={item.brand ?? 'Seller'}
              stockLevel={item?.variants?.[0]?.inStock ? 'in-stock' : 'out-of-stock'}
            />
          </View>
        )
      }
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={() => refetch()} />}
    />
  );
}
