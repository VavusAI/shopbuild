import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export function SellerBadge({
                              sellerName,
                              sellerSlug,
                              verified = false,
                              onPress, // optional override
                            }: {
  sellerName: string;
  sellerSlug?: string;
  verified?: boolean;
  onPress?: () => void;
}) {
  const nav = useNavigation();
  const go = () => {
    if (onPress) return onPress();
    // navigate only if you have a Seller screen registered
    if (sellerSlug) {
      // @ts-ignore – add route in RootStackParamList when ready
      nav.navigate('Seller', { slug: sellerSlug });
    }
  };

  return (
    <Pressable onPress={go} style={styles.row}>
      <Icon name="store-outline" size={14} color="#5f6a7d" />
      <Text style={styles.name}>{sellerName}</Text>
      {verified && <Icon name="check-decagram" size={14} color="#0ea5e9" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { color: '#5f6a7d', fontSize: 12 },
});
