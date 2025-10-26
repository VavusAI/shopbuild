import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { Money } from '../types/shop';
import { formatCurrency } from '../lib/format';

export default function Price({
                                price,
                                compareAt,
                                size = 16,
                              }: { price?: Money; compareAt?: Money | null; size?: number }) {
  const onSale = compareAt && compareAt.amount > (price?.amount ?? 0);
  return (
    <View style={styles.row}>
      <Text style={[styles.price, { fontSize: size }]}>{formatCurrency(price!)}</Text>
      {onSale && (
        <Text style={[styles.compare, { fontSize: size * 0.85 }]}>
          {formatCurrency(compareAt!)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  price: { fontWeight: '700' },
  compare: { textDecorationLine: 'line-through', color: '#888' },
});
