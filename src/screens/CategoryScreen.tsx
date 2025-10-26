import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AMAZON_TOPCATS } from '../constants/taxonomy.amazon';
import VectorIcon, { VectorIconName } from '../components/icons/VectorIcon';

const ICON_MAP: Record<string, VectorIconName> = {
  'home': 'home',
  'electronics': 'electronics',
  'fashion': 'fashion',
  'book': 'book',
  'gamepad': 'bell',      // Lucide has 'Gamepad2', but we mapped minimal set; swap if you add more
  'music': 'bell',
  'heart': 'heart',
  'dumbbell': 'dumbbell',
  'package': 'package',
  'user': 'user',
  'camera': 'camera',
  'mic': 'mic',
  'search': 'search',
  'bell': 'bell',
  'cart': 'cart',
  'sparkles': 'bell',
};

export default function CategoryScreen() {
  const nav = useNavigation<any>();

  return (
    <FlatList
      contentContainerStyle={styles.grid}
      data={AMAZON_TOPCATS}
      numColumns={2}
      keyExtractor={(c) => c.slug}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => nav.navigate('Subcategories', { categorySlug: item.slug, categoryName: item.name })}
        >
          <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
          <View style={styles.tileArt}>
            <VectorIcon name={ICON_MAP[item.icon] ?? 'bell'} size={40} color="#111" />
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  grid: { padding: 12, gap: 12 },
  card: {
    flex: 1,
    minHeight: 160,
    borderWidth: 1,
    borderColor: '#e6e8eb',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 14,
    margin: 6,
    overflow: 'hidden',
  },
  title: { fontSize: 16, fontWeight: '800', color: '#111' },
  tileArt: {
    flex: 1,
    borderTopLeftRadius: 80,
    backgroundColor: '#eaf3fb',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
});
