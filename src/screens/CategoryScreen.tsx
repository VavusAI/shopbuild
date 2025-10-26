import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';
import { PRODUCTS_MOCK } from '../mocks/products';
import { MEGA_CATEGORIES, CATEGORY_KEYWORDS } from '../constants/megaMenu';
import VectorIcon, { VectorIconName } from '../components/icons/VectorIcon';

function toText(p: any) {
  const parts: string[] = [];
  parts.push(p?.title, p?.brand, p?.category, p?.categoryName, p?.collection, p?.type);
  if (Array.isArray(p?.tags)) parts.push(...p.tags);
  if (Array.isArray(p?.attributes)) parts.push(...p.attributes.map((a: any) => a?.name));
  return parts.filter(Boolean).join(' ').toLowerCase();
}
function matchAny(txt: string, terms: string[]) {
  return terms.some(t => txt.includes(t));
}

const CAT_ICON: Record<string, VectorIconName> = {
  'electronics': 'electronics',
  'fashion': 'fashion',
  'home-garden': 'home-garden',
  'beauty-health': 'beauty-health',
  'sports-outdoors': 'sports-outdoors',
};

export default function CategoryScreen() {
  const nav = useNavigation<any>();
  const { data } = useQuery({ queryKey: ['catalog'], queryFn: fetchCatalog, staleTime: 60_000 });
  const products: Product[] = useMemo(() => data?.products ?? PRODUCTS_MOCK, [data]);

  // Soft counts (never hide a category if 0)
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of MEGA_CATEGORIES) counts[cat.slug] = 0;

    for (const p of products) {
      const txt = toText(p);
      for (const cat of MEGA_CATEGORIES) {
        const kws = CATEGORY_KEYWORDS[cat.slug] ?? [];
        if (matchAny(txt, kws)) counts[cat.slug] += 1;
      }
    }

    return MEGA_CATEGORIES.map(c => ({
      ...c,
      count: counts[c.slug] ?? 0,
      icon: CAT_ICON[c.slug] ?? 'chevron-right',
    }));
  }, [products]);

  return (
    <FlatList
      contentContainerStyle={styles.grid}
      data={categories}
      numColumns={2}
      keyExtractor={(c) => c.slug}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => nav.navigate('Subcategories', { categorySlug: item.slug, categoryName: item.name })}
        >
          <VectorIcon name={item.icon as VectorIconName} size={30} />
          <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
          <Text style={[styles.muted, !item.count && { opacity: 0.7 }]}>
            {item.count} item{item.count === 1 ? '' : 's'}
          </Text>
        </Pressable>
      )}
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
  title: { fontSize: 15, fontWeight: '700', color: '#111', textAlign: 'center' },
  muted: { color: '#5f6a7d' },
});
