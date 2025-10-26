import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { AccountStackParamList } from '../../navigation/AccountNavigator';
import TextIcon from '../../components/icons/TextIcon';

type Nav = any;

const rows = [
  { key: 'Profile', label: 'Profile', icon: 'account' as const },
  { key: 'Addresses', label: 'Addresses', icon: 'home' as const },
  { key: 'Payments', label: 'Payment Methods', icon: 'cart' as const },
  { key: 'Notifications', label: 'Notifications', icon: 'bell' as never }, // we’ll render › only
  { key: 'Follows', label: 'Follows', icon: 'account' as const },
];

export default function AccountHomeScreen() {
  const nav = useNavigation<Nav>();
  return (
    <View style={styles.page}>
      <View style={styles.card}>
        {rows.map((r, i) => (
          <Pressable key={r.key} style={[styles.row, i > 0 && styles.rowTop]} onPress={() => nav.navigate(r.key)}>
            <View style={styles.rowLeft}>
              {/* left glyphs for a little affordance */}
              <TextIcon name={r.icon as any} size={18} color="#111" />
              <Text style={styles.rowTxt}>{r.label}</Text>
            </View>
            <Text style={styles.chev}>›</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff', padding: 12 },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e8eb',
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTop: { borderTopWidth: 1, borderColor: '#eee' },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowTxt: { fontSize: 16, fontWeight: '600', color: '#111' },
  chev: { fontSize: 18, color: '#111', fontWeight: '800' },
});
