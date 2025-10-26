// src/screens/ProductScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';

import { RatingStars } from '../components/RatingStars';
import { Button } from '../components/ui/Button';
import ProductCard from '../components/ProductCard';
import { PRODUCTS_MOCK } from '../mocks/products';
import { useCartStore } from '../stores/cart';

type ParamList = { Product: { id: string } };

const SCREEN_W = Dimensions.get('window').width;
const GUTTER = 12;
const H_PADDING = 12;
const CARD_W = (SCREEN_W - H_PADDING * 2 - GUTTER) / 2;
const SNAP_INTERVAL = CARD_W + GUTTER;

export default function ProductScreen() {
  const nav = useNavigation();
  const { params } = useRoute<RouteProp<ParamList, 'Product'>>();
  const productId = params?.id;

  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ['catalog'],
    queryFn: fetchCatalog,
    staleTime: 60_000,
  });

  const list: Product[] = useMemo(() => data?.products ?? [], [data]);

  const product = useMemo<Product | undefined>(() => {
    const fromApi = list.find(p => p.id === productId);
    if (fromApi) return fromApi;
    return PRODUCTS_MOCK.find(p => p.id === productId) ?? PRODUCTS_MOCK[0];
  }, [list, productId]);

  const related: Product[] = useMemo(() => {
    if (!product) return PRODUCTS_MOCK.slice(0, 6);
    const source = (list.length ? list : PRODUCTS_MOCK);
    const sameBrand = source.filter(p => p.id !== product.id && p.brand === product.brand);
    const pool = sameBrand.length ? sameBrand : source;
    return pool.slice(0, 10);
  }, [list, product]);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  // ---- cart wiring ----
  const add = useCartStore(s => s.add);
  const priceCents =
    product?.variants?.[0]?.price?.amount ?? product?.minPrice?.amount ?? 0;
  const compareCents = product?.variants?.[0]?.compareAtPrice?.amount;
  const inStock = product?.variants?.[0]?.inStock ?? true;
  const currency = product?.variants?.[0]?.price?.currency
    ?? product?.minPrice?.currency
    ?? 'USD';

  const onAddToCart = () => {
    add({
      id: product.id,
      title: product.title,
      image: product.images?.[0]?.url ?? null,
      price: { amount: priceCents, currency },
      qty: 1,
    });
  };

  const onBuyNow = () => {
    onAddToCart();
    // nav.navigate('Cart' as never);
  };

  return (
    <ScrollView
      style={styles.page}
      refreshControl={
        <RefreshControl
          refreshing={isFetching || isLoading}
          onRefresh={() => { void refetch(); }}
        />
      }
    >
      <View style={styles.topRow}>
        <Pressable onPress={() => nav.goBack()} hitSlop={10} style={styles.iconBtn}>
          <Icon name="arrow-left" size={20} color="#111" />
        </Pressable>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable onPress={() => {}} hitSlop={10} style={styles.iconBtn}>
            <Icon name="share-2" size={20} color="#111" />
          </Pressable>
          <Pressable onPress={() => nav.navigate('Cart' as never)} hitSlop={10} style={styles.iconBtn}>
            <Icon name="shopping-cart" size={20} color="#111" />
          </Pressable>
        </View>
      </View>

      <Gallery images={product.images?.map(i => i.url).filter(Boolean) ?? []} />

      <View style={styles.body}>
        <Text style={styles.brand}>{product.brand ?? 'Brand'}</Text>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.row}>
          <RatingStars rating={product.rating ?? 0} size="md" />
          <Text style={styles.muted}>({product.ratingCount ?? 0})</Text>
        </View>

        <View style={[styles.rowBetween, { marginTop: 8 }]}>
          <View style={styles.row}>
            <Text style={styles.price}>{fmt(priceCents, currency)}</Text>
            {compareCents && compareCents > priceCents ? (
              <Text style={styles.compare}>{fmt(compareCents, currency)}</Text>
            ) : null}
          </View>
          <Text
            style={[
              styles.stock,
              !inStock && { color: '#888', borderColor: '#ddd' },
            ]}
          >
            {inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
          <Button size="lg" onPress={onAddToCart} style={{ flex: 1 }}>
            <Text style={styles.ctaText}>Add to Cart</Text>
          </Button>
          <Button size="lg" variant="outline" onPress={onBuyNow} style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700', color: '#111' }}>Buy Now</Text>
          </Button>
        </View>

        <View style={{ marginTop: 18, gap: 6 }}>
          <Text style={styles.sectionTitle}>About this item</Text>
          <Text style={styles.muted}>
            High-quality materials, great performance, and designed for daily use.
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        <View style={[styles.sectionHeader]}>
          <Text style={styles.sectionTitle}>Related items</Text>
          <Pressable style={styles.linkRow}>
            <Text style={styles.linkTxt}>See all</Text>
            <Icon name="chevron-right" size={14} color="#111" />
          </Pressable>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={related}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: H_PADDING }}
          ItemSeparatorComponent={() => <View style={{ width: GUTTER }} />}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          renderItem={({ item }) => (
            <View style={{ width: CARD_W }}>
              <ProductCard
                id={item.id}
                image={item.images?.[0]?.url ?? ''}
                title={item.title}
                price={item?.variants?.[0]?.price?.amount ?? item?.minPrice?.amount ?? 0}
                originalPrice={item?.variants?.[0]?.compareAtPrice?.amount ?? undefined}
                rating={item.rating ?? 0}
                reviewCount={item.ratingCount ?? 0}
                seller={item.brand ?? 'Seller'}
                stockLevel={item?.variants?.[0]?.inStock ? 'in-stock' : 'out-of-stock'}
              />
            </View>
          )}
        />
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function Gallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / SCREEN_W);
    setIndex(i);
  };

  if (!images.length) {
    return (
      <View style={[styles.gallery, { backgroundColor: '#f3f3f3' }]}>
        <Icon name="image" size={28} color="#bbb" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(u, i) => `${u}-${i}`}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.galleryImg} resizeMode="cover" />
        )}
      />
      <View style={styles.dots}>
        {images.map((_, i) => (
          <View key={i} style={[styles.dot, i === index ? styles.dotActive : null]} />
        ))}
      </View>
    </View>
  );
}

function fmt(amountCents: number, currency = 'USD') {
  const amount = (amountCents ?? 0) / 100;
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  topRow: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: { padding: 6 },

  gallery: {
    width: SCREEN_W,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryImg: { width: SCREEN_W, aspectRatio: 1 },
  dots: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    gap: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ddd' },
  dotActive: { backgroundColor: '#333' },

  body: { paddingHorizontal: 12, paddingVertical: 12, gap: 6 },
  brand: { color: '#666', fontSize: 13 },
  title: { fontSize: 18, fontWeight: '800' },

  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  muted: { color: '#666' },

  price: { fontWeight: '800', fontSize: 20 },
  compare: { color: '#888', textDecorationLine: 'line-through', marginLeft: 8 },
  stock: {
    borderWidth: 1,
    borderColor: '#0a0',
    color: '#0a0',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 11,
    fontWeight: '700',
  },

  ctaText: { color: '#fff', fontWeight: '700' },

  sectionHeader: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  linkTxt: { color: '#111', fontWeight: '700' },
});
