import React from 'react';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';

const DEFAULT = [
  { name: 'Deals' },
  { name: 'Trending' },
  { name: 'Top Rated' },
  { name: 'Following' },
];

export default function CategoryNav({
                                      options = DEFAULT,
                                      active,
                                      onSelect,
                                    }: {
  options?: { name: string }[];
  active?: string | null;
  onSelect?: (name: string) => void;
}) {
  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroller}                         // <-- fixed height
        contentContainerStyle={styles.row}              // <-- no flexGrow
      >
        {options.map((item, idx) => {
          const selected = item.name === active;
          return (
            <Pressable
              key={item.name}
              onPress={() => onSelect?.(item.name)}
              style={[
                styles.item,
                selected && styles.itemActive,
                idx !== options.length - 1 && styles.itemSpacer,
              ]}
            >
              <Text style={[styles.txt, selected && styles.txtActive]}>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    paddingVertical: 8,
  },
  scroller: {
    height: 40,                   // <-- keeps it from stretching vertically
  },
  row: {
    paddingHorizontal: 12,
    alignItems: 'center',
    // Prevent ScrollView content from growing to full height:
    flexGrow: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemSpacer: { marginRight: 12 },
  itemActive: { backgroundColor: '#111', borderColor: '#111' },
  txt: { fontSize: 13, fontWeight: '600', color: '#111' },
  txtActive: { color: '#fff' },
});
