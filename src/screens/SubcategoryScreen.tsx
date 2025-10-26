import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';
import { PRODUCTS_MOCK } from '../mocks/products';
import { MEGA_CATEGORIES } from '../constants/megaMenu';

type ParamList = {
  Subcategories: { categorySlug: string; categoryName: string };
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

export default function SubcategoryScreen() {
  const nav = useNavigation<any>();
  const { params } = useRoute<RouteProp<ParamList, 'Subcategories'>>();
  const { categorySlug, categoryName } = params;

  const { data } = useQuery({ queryKey: ['catalog'], queryFn: fetchCatalog, staleTime: 60_000 });
  const products: Product[] = useMemo(() => data?.products ?? PRODUCTS_MOCK, [data]);

  const top = MEGA_CATEGORIES.find(c => c.slug === categorySlug);
  const subs = top?.subcategories ?? [];

  // Count products per subcategory
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) {
      const txt = allTextOfProduct(p);
      for (const sc of subs) {
        if (regBySlug(sc.slug).test(txt)) {
          map.set(sc.slug, (map.get(sc.slug) ?? 0) + 1);
        }
      }
    }
    return map;
  }, [products, subs]);

  const dataSource = subs
    .map(s => ({ ...s, count: counts.get(s.slug) ?? 0 }))
    .filter(s => s.count > 0);

  const onPress = (sub: { name: string; slug: string }) => {
    nav.navigate('ProductList', {
      title: sub.name,
      category: categoryName,
      subcategory: sub.slug,
    });
  };

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.h1}>{categoryName}</Text>
          <Text style={styles.muted}>Choose a subcategory</Text>
        </View>
      }
      contentContainerStyle={styles.grid}
      data={dataSource}
      numColumns={2}
      keyExtractor={(c) => c.slug}
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => onPress(item)}>
          <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.muted}>{item.count} item{item.count === 1 ? '' : 's'}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 6 },
  h1: { fontSize: 20, fontWeight: '800', color: '#111' },
  muted: { color: '#5f6a7d' },

  grid: { padding: 12, gap: 12 },
  card: {
    flex: 1,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#e6e8eb',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 14,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  title: { fontSize: 15, fontWeight: '700', color: '#111', textAlign: 'center' },
});
