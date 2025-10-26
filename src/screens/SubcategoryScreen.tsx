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

function toText(p: any) {
  const parts: string[] = [];
  parts.push(p?.title, p?.brand, p?.category, p?.categoryName, p?.collection, p?.type);
  if (Array.isArray(p?.tags)) parts.push(...p.tags);
  if (Array.isArray(p?.attributes)) parts.push(...p.attributes.map((a: any) => a?.name));
  return parts.filter(Boolean).join(' ').toLowerCase();
}

export default function SubcategoryScreen() {
  const nav = useNavigation<any>();
  const { params } = useRoute<RouteProp<ParamList, 'Subcategories'>>();
  const { categorySlug, categoryName } = params;

  const { data } = useQuery({ queryKey: ['catalog'], queryFn: fetchCatalog, staleTime: 60_000 });
  const products: Product[] = useMemo(() => data?.products ?? PRODUCTS_MOCK, [data]);

  const top = MEGA_CATEGORIES.find(c => c.slug === categorySlug);
  const subs = top?.subcategories ?? [];

  // Soft counts per subcategory
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of subs) map.set(s.slug, 0);
    for (const p of products) {
      const txt = toText(p);
      for (const s of subs) {
        const words = s.slug.replace(/-/g, ' ').replace('&', 'and').split(/\s+/).filter(Boolean);
        if (words.some(w => txt.includes(w))) {
          map.set(s.slug, (map.get(s.slug) ?? 0) + 1);
        }
      }
    }
    return map;
  }, [products, subs]);

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.h1}>{categoryName}</Text>
          <Text style={styles.muted}>Choose a subcategory</Text>
        </View>
      }
      contentContainerStyle={styles.grid}
      data={subs}
      numColumns={2}
      keyExtractor={(c) => c.slug}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() =>
            nav.navigate('ProductList', {
              title: item.name,
              category: categoryName,
              subcategory: item.slug,
            })
          }
        >
          <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
          <Text style={[styles.muted, !(counts.get(item.slug) ?? 0) && { opacity: 0.7 }]}>
            {(counts.get(item.slug) ?? 0)} item{(counts.get(item.slug) ?? 0) === 1 ? '' : 's'}
          </Text>
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
