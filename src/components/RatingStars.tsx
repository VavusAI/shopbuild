// src/components/RatingStars.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type TokenSize = 'sm' | 'md' | 'lg';
type Size = number | TokenSize;

function normalizeSize(size?: Size) {
  if (typeof size === 'number') return size;
  switch (size) {
    case 'sm': return 12;
    case 'lg': return 18;
    case 'md':
    default: return 14;
  }
}

export function RatingStars({
                              rating,
                              maxRating = 5,
                              size = 'md',
                              showNumber = false,
                              count,
                              color = '#f59e0b',     // star color (amber-ish)
                              emptyColor = '#c7c7c7', // empty star color
                            }: {
  rating: number;
  maxRating?: number;
  size?: Size;
  showNumber?: boolean;
  count?: number;
  color?: string;
  emptyColor?: string;
}) {
  const iconSize = normalizeSize(size);

  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = Math.max(0, maxRating - full - half);

  return (
    <View style={styles.row}>
      <View style={styles.row}>
        {Array.from({ length: full }).map((_, i) => (
          <Icon key={`f-${i}`} name="star" size={iconSize} color={color} />
        ))}
        {half === 1 && (
          <Icon name="star-half-full" size={iconSize} color={color} />
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Icon key={`e-${i}`} name="star-outline" size={iconSize} color={emptyColor} />
        ))}
      </View>
      {showNumber && <Text style={styles.num}>{rating.toFixed(1)}</Text>}
      {typeof count === 'number' && <Text style={styles.count}>({count})</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  num: { marginLeft: 6, fontSize: 12, fontWeight: '600', color: '#111' },
  count: { marginLeft: 4, fontSize: 12, color: '#5f6a7d' },
});
