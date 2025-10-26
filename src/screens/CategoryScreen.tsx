import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';
import { PRODUCTS_MOCK } from '../mocks/products';

/** -------- Canonical top-level categories (web-style) -------- */
const CANON = [
  { key: 'Electronics', icon: '📱' },
  { key: 'Fashion', icon: '👗' },
  { key: 'Home & Garden', icon: '🏡' },
  { key: 'Beauty & Health', icon: '💄' },
  { key: 'Sports & Outdoors', icon: '🏅' },
  { key: 'Toys & Games', icon: '🧸' },
  { key: 'Automotive', icon: '🚗' },
  { key: 'Books', icon: '📚' },
  { key: 'Grocery', icon: '🛒' },
  { key: 'Pets', icon: '🐶' },
  { key: 'Handmade & Crafts', icon: '🧵' },
  { key: 'Other', icon: '🛍️' },
] as const;

type CanonKey = (typeof CANON)[number]['key'];

/** Try to normalize a product into one of the canonical categories */
function mapToCanonCategory(p: any): CanonKey {
  const raw: string =
    p?.category ||
    p?.categoryName ||
    p?.collection ||
    p?.type ||
    p?.tags?.[0] ||
    'Other';

  const s = raw.toString().toLowerCase();

  if (/(phone|mobile|laptop|tablet|camera|electronics|audio|headphone|tv|console)/.test(s))
    return 'Electronics';
  if (/(fashion|apparel|clothing|shoe|dress|shirt|pants|bag)/.test(s))
    return 'Fashion';
  if (/(home|kitchen|furniture|garden|decor)/.test(s))
    return 'Home & Garden';
  if (/(beauty|makeup|health|skincare|wellness)/.test(s))
    return 'Beauty & Health';
  if (/(sport|outdoor|fitness|camp|hike|bike)/.test(s))
    return 'Sports & Outdoors';
  if (/(toy|game|lego|puzzle|kids)/.test(s))
    return 'Toys & Games';
  if (/(auto|automotive|car|motor|tire)/.test(s))
    return 'Automotive';
  if (/(book|novel|comic|manga)/.test(s))
    return 'Books';
  if (/(grocery|food|snack|beverage|drink)/.test(s))
    return 'Grocery';
  if (/(pet|dog|cat|bird|aquarium)/.test(s))
    return 'Pets';
  if (/(handmade|craft|artisan|etsy|maker)/.test(s))
    return 'Handmade & Crafts';

  return 'Other';
}

export default function CategoryScreen() {
  const nav = useNavigation<any>();
  const { data } = useQuery({
    queryKey: ['catalog'],
    queryFn: fetchCatalog,
    staleTime: 60_000,
  });

  const products: Product[] = useMemo(() => data?.products ?? PRODUCTS_MOCK, [data]);

  // Count products per canonical category
  const counts = useMemo(() => {
    const map = new Map<CanonKey, number>();
    for (const p of products) {
      const ck = mapToCanonCategory(p);
      map.set(ck, (map.get(ck) ?? 0) + 1);
    }
    return map;
  }, [products]);

  // Only show categories that have items, but always include “Other” if it has items
  const visible = useMemo(() => {
    const withCounts = CANON.map(c => ({
      ...c,
      count: counts.get(c.key as CanonKey) ?? 0,
    }));
    const list = withCounts.filter(c => c.count > 0);
    // Keep canonical ordering, “Other” naturally falls to the end
    return list;
  }, [counts]);

  const onPress = (name: string) => {
    nav.navigate('ProductList', { title: name, category: name });
  };

  return (
    <FlatList
      contentContainerStyle={styles.grid}
      data={visible}
      numColumns={2}
      keyExtractor={(c) => c.key}
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => onPress(item.key)}>
          <Text style={styles.emoji}>{item.icon}</Text>
          <Text style={styles.title} numberOfLines={2}>{item.key}</Text>
          <Text style={styles.muted}>
            {item.count} item{item.count === 1 ? '' : 's'}
          </Text>
        </Pressable>
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.muted}>No categories found.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  grid: { padding: 12, gap: 12 },
  card: {
    flex: 1,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#e6e8eb',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 14,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  emoji: { fontSize: 32 },
  title: { fontSize: 15, fontWeight: '700', color: '#111', textAlign: 'center' },
  muted: { color: '#5f6a7d' },
  empty: { padding: 24, alignItems: 'center' },
});
