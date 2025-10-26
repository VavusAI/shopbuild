import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AMAZON_TOPCATS } from '../constants/taxonomy.amazon';

type ParamList = {
  Subcategories: { categorySlug: string; categoryName: string };
};

export default function SubcategoryScreen() {
  const nav = useNavigation<any>();
  const { params } = useRoute<RouteProp<ParamList, 'Subcategories'>>();
  const { categorySlug, categoryName } = params;
  const top = AMAZON_TOPCATS.find(c => c.slug === categorySlug);

  const subs = top?.subcategories ?? [];

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
              category: categorySlug,
              subcategory: item.slug,
            })
          }
        >
          <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
          <View style={styles.tileArt} />
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
    minHeight: 130,
    borderWidth: 1,
    borderColor: '#e6e8eb',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 14,
    margin: 6,
    overflow: 'hidden',
  },
  title: { fontSize: 15, fontWeight: '700', color: '#111' },
  tileArt: {
    flex: 1,
    borderTopLeftRadius: 80,
    backgroundColor: '#eef6ee',
    marginTop: 10,
  },
});
