import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Size = 'sm' | 'md' | 'lg';

export function RatingStars({
                              rating,
                              maxRating = 5,
                              size = 'md',
                              showNumber = false,
                              count,
                            }: {
  rating: number;
  maxRating?: number;
  size?: Size;
  showNumber?: boolean;
  count?: number;
}) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = Math.max(0, maxRating - full - half);

  const iconSize = size === 'lg' ? 18 : size === 'sm' ? 12 : 14;

  return (
    <View style={styles.row}>
      <View style={styles.row}>
        {Array.from({ length: full }).map((_, i) => (
          <Icon key={`f-${i}`} name="star" size={iconSize} color="#f59e0b" />
        ))}
        {half === 1 && <Icon name="star-half-full" size={iconSize} color="#f59e0b" />}
        {Array.from({ length: empty }).map((_, i) => (
          <Icon key={`e-${i}`} name="star-outline" size={iconSize} color="#c7c7c7" />
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
  count: { marginLeft: 4, fontSize: 12, color: '#666' },
});
