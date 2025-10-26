import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function PriceBadge({
                             price,            // cents
                             originalPrice,    // cents
                             currency = '$',
                             size = 'md',
                           }: {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const curr = (price ?? 0) / 100;
  const compare = originalPrice ? originalPrice / 100 : undefined;
  const discount =
    compare && compare > curr ? Math.round(((compare - curr) / compare) * 100) : 0;

  const fs = size === 'lg' ? 22 : size === 'sm' ? 14 : 18;
  const os = size === 'lg' ? 14 : size === 'sm' ? 10 : 12;

  return (
    <View style={styles.row}>
      <Text style={[styles.price, { fontSize: fs }]}>
        {currency}
        {curr.toFixed(2)}
      </Text>
      {compare && compare > curr && (
        <>
          <Text style={[styles.compare, { fontSize: os }]}>
            {currency}
            {compare.toFixed(2)}
          </Text>
          <Text style={styles.save}>Save {discount}%</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  price: { fontWeight: '800', color: '#111' },
  compare: { color: '#888', textDecorationLine: 'line-through' },
  save: { color: '#10b981', fontSize: 12, fontWeight: '600' },
});
