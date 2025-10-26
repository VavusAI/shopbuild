import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Rating({
                                 value = 0,
                                 count = 0,
                                 compact,
                               }: { value?: number; count?: number; compact?: boolean }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = '★★★★★'.split('').map((s, i) => {
    const filled = i < full || (i === full && half);
    return <Text key={i} style={[styles.star, filled ? styles.filled : styles.empty]}>★</Text>;
  });
  return (
    <View style={styles.row}>
      <View style={styles.starRow}>{stars}</View>
      {!compact && !!count && <Text style={styles.count}>({count})</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  starRow: { flexDirection: 'row' },
  star: { fontSize: 12 },
  filled: { color: '#f2b01e' },
  empty: { color: '#ddd' },
  count: { color: '#5f6a7d', fontSize: 12 },
});
