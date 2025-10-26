// src/components/ProductCard.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { RatingStars } from './RatingStars';
import { PriceBadge } from './PriceBadge';
import { SellerBadge } from './SellerBadge';

type Props = {
  id: string;
  image: string;
  title: string;
  price: number;          // cents
  originalPrice?: number; // cents
  rating: number;
  reviewCount: number;
  seller: string;
  sellerSlug?: string;
  badge?: 'deal'|'trending'|'handmade'|'clearance'|'limited'|'rollback';
  stockLevel?: 'in-stock'|'low-stock'|'out-of-stock';
  dealEndTime?: Date;
};

export default function ProductCard(p: Props) {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPress = () => nav.navigate('Product', { id: p.id });

  const stock = p.stockLevel ?? 'in-stock';

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.imgWrap}>
        <Image source={{ uri: p.image }} style={styles.img} resizeMode="cover" />
        {p.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeTxt}>
              {p.badge === 'handmade' ? 'Handmade' : p.badge}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <Text numberOfLines={2} style={styles.title}>{p.title}</Text>

        <View style={styles.row}>
          <RatingStars rating={p.rating} count={p.reviewCount} size="sm" />
        </View>

        <View style={styles.rowBetween}>
          <PriceBadge price={p.price} originalPrice={p.originalPrice} size="md" />
          <Text
            style={[
              styles.stock,
              stock === 'low-stock' && { color: '#b7791f', borderColor: '#b7791f' },
              stock === 'out-of-stock' && { color: '#888', borderColor: '#ddd' },
            ]}
          >
            {stock === 'low-stock'
              ? 'Low Stock'
              : stock === 'out-of-stock'
                ? 'Out of Stock'
                : 'In Stock'}
          </Text>
        </View>

        <SellerBadge sellerName={p.seller} sellerSlug={p.sellerSlug} verified />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card:{ backgroundColor:'#fff', borderRadius:14, overflow:'hidden', borderWidth:1, borderColor:'#eee' },
  imgWrap:{ width:'100%', aspectRatio:1, backgroundColor:'#f3f3f3' },
  img:{ width:'100%', height:'100%' },
  badge:{ position:'absolute', top:8, left:8, backgroundColor:'#111', paddingHorizontal:8, paddingVertical:4, borderRadius:999 },
  badgeTxt:{ color:'#fff', fontWeight:'700', fontSize:11, textTransform:'capitalize' },
  body:{ padding:10, gap:6 },
  title:{ fontWeight:'600' },
  row:{ flexDirection:'row', alignItems:'center', gap:8 },
  rowBetween:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  stock:{ borderWidth:1, borderColor:'#0a0', color:'#0a0', borderRadius:6, paddingHorizontal:6, paddingVertical:2, fontSize:11, fontWeight:'700' },
});
