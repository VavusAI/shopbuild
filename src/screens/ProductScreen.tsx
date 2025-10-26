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
import {
  RouteProp,
  useRoute,
  useNavigation,
  StackActions,
} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';

import { Button } from '../components/ui/Button';
import ProductCard from '../components/ProductCard';
import { PRODUCTS_MOCK } from '../mocks/products';
import { useCartStore } from '../stores/cart';

// ---------- text icons (no vector fonts) ----------
const BACK_GLYPH = '❮'; // U+276E looks clean and bold
const SHARE_GLYPH = '↗';
const CART_GLYPH = '🛒';

// Simple rating (★ ☆) without icon fonts
const RatingStarsText = ({
                           rating,
                           max = 5,
                           size = 14,
                         }: { rating: number; max?: number; size?: number }) => {
  const full = Math.max(0, Math.min(max, Math.round(rating)));
  const stars = '★'.repeat(full) + '☆'.repeat(max - full);
  return <Text style={[styles.stars, { fontSize: size }]}>{stars}</Text>;
};

type ParamList = { Product: { id: string } };

const SCREEN_W = Dimensions.get('window').width;
const GUTTER = 12;
const H_PADDING = 12;
const CARD_W = (SCREEN_W - H_PADDING * 2 - GUTTER) / 2;
const SNAP_INTERVAL = CARD_W + GUTTER;

/** kept outside render for lint rule */
const ItemSep = () => <View style={styles.sep} />;

export default function ProductScreen() {
  const nav = useNavigation();
  const insets = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<ParamList, 'Product'>>();
  const productId = params?.id;

  // cart hook must be early
  const add = useCartStore(s => s.add);

  const { data, isFetching, isLoading, refetch } = useQuery({
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

  // ---- Back handler (always works) ----
  const handleBack = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyNav = nav as any;
    if (anyNav?.canGoBack?.()) anyNav.goBack();
    else anyNav?.dispatch?.(StackActions.popToTop());
  };

  if (!product) {
    return (
      <View style={styles.center}>
        <View style={[styles.topRow, { paddingTop: Math.max(insets.top, 8) }]}>
          <Pressable
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={16}
            style={styles.backBtn}
          >
            <Text style={styles.backGlyph}>{BACK_GLYPH}</Text>
          </Pressable>

          <View style={styles.actionsRow}>
            <Pressable onPress={() => {}} hitSlop={10} style={styles.iconBtn}>
              <Text style={styles.iconTxt}>{SHARE_GLYPH}</Text>
            </Pressable>
            <Pressable onPress={() => anyNavNavigateCart(nav)} hitSlop={10} style={styles.iconBtn}>
              <Text style={styles.iconTxt}>{CART_GLYPH}</Text>
            </Pressable>
          </View>
        </View>
        <Text>Product not found.</Text>
      </View>
    );
  }

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
    // (optional) navigate to cart here
    // anyNavNavigateCart(nav);
  };

  return (
    <ScrollView
      style={styles.page}
      refreshControl={
        <RefreshControl
          refreshing={isFetching || isLoading}
          onRefresh={() => { refetch().catch(() => {}); }}
        />
      }
    >
      <View style={[styles.topRow, { paddingTop: Math.max(insets.top, 8) }]}>
        <Pressable
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={16}
          style={styles.backBtn}
        >
          <Text style={styles.backGlyph}>{BACK_GLYPH}</Text>
        </Pressable>

        <View style={styles.actionsRow}>
          <Pressable onPress={() => {}} hitSlop={10} style={styles.iconBtn}>
            <Text style={styles.iconTxt}>{SHARE_GLYPH}</Text>
          </Pressable>
          <Pressable onPress={() => anyNavNavigateCart(nav)} hitSlop={10} style={styles.iconBtn}>
            <Text style={styles.iconTxt}>{CART_GLYPH}</Text>
          </Pressable>
        </View>
      </View>

      <Gallery images={product.images?.map(i => i.url).filter(Boolean) ?? []} />

      <View style={styles.body}>
        <Text style={styles.brand}>{product.brand ?? 'Brand'}</Text>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.row}>
          <RatingStarsText rating={product.rating ?? 0} size={14} />
          <Text style={styles.muted}>({product.ratingCount ?? 0})</Text>
        </View>

        <View style={[styles.rowBetween, styles.mt8]}>
          <View style={styles.row}>
            <Text style={styles.price}>{fmt(priceCents, currency)}</Text>
            {compareCents && compareCents > priceCents ? (
              <Text style={styles.compare}>{fmt(compareCents, currency)}</Text>
            ) : null}
          </View>
          <Text style={[styles.stock, !inStock && styles.stockOut]}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>

        <View style={styles.ctaRow}>
          <Button size="lg" onPress={onAddToCart} style={styles.flex1}>
            <Text style={styles.ctaText}>Add to Cart</Text>
          </Button>
          <Button size="lg" variant="outline" onPress={onBuyNow} style={styles.flex1}>
            <Text style={styles.buyNowTxt}>Buy Now</Text>
          </Button>
        </View>

        <View style={styles.aboutBlock}>
          <Text style={styles.sectionTitle}>About this item</Text>
          <Text style={styles.muted}>
            High-quality materials, great performance, and designed for daily use.
          </Text>
        </View>
      </View>

      <View style={styles.relatedWrap}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Related items</Text>
          <Pressable style={styles.linkRow}>
            <Text style={styles.linkTxt}>See all</Text>
            <Text style={styles.linkArrow}>{'\u203A'}</Text>
          </Pressable>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={related}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.relatedListPad}
          ItemSeparatorComponent={ItemSep}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          decelerationRate="fast"
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
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

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

// helper to navigate to Cart without types noise
function anyNavNavigateCart(nav: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (nav as any)?.navigate?.('Cart');
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
      <View style={[styles.gallery, styles.galleryEmpty]}>
        <Text style={styles.imagePlaceholder}>{'\u25A1'}</Text>
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

  // top bar
  topRow: {
    paddingHorizontal: 12,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // BIG back button
  backBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    // subtle shadow/elevation
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  backGlyph: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 28 * 1.05,
    fontWeight: '800',
  },

  // right-side icons
  iconBtn: { padding: 8, alignItems: 'center', justifyContent: 'center' },
  actionsRow: { flexDirection: 'row', gap: 10 },
  iconTxt: { fontSize: 22, color: '#111' },

  // gallery
  gallery: {
    width: SCREEN_W,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryEmpty: { backgroundColor: '#f3f3f3' },
  galleryImg: { width: SCREEN_W, aspectRatio: 1 },
  imagePlaceholder: { fontSize: 28, color: '#bbb' },

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

  // body / info
  body: { paddingHorizontal: 12, paddingVertical: 12, gap: 6 },
  brand: { color: '#5f6a7d', fontSize: 13 },
  title: { fontSize: 18, fontWeight: '800' },

  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  muted: { color: '#5f6a7d' },
  mt8: { marginTop: 8 },

  // rating stars
  stars: { color: '#f5a623', letterSpacing: 1 },

  // price / stock
  price: { fontWeight: '800', fontSize: 20 },
  compare: { color: '#8a8a8a', textDecorationLine: 'line-through', marginLeft: 8 },
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
  stockOut: { color: '#888', borderColor: '#ddd' },

  // buttons
  ctaRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  flex1: { flex: 1 },
  ctaText: { color: '#fff', fontWeight: '700' },
  buyNowTxt: { fontWeight: '700', color: '#111' },

  // about
  aboutBlock: { marginTop: 18, gap: 6 },

  // related section
  relatedWrap: { marginTop: 12 },
  relatedListPad: { paddingHorizontal: H_PADDING },
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
  linkArrow: { color: '#111', fontSize: 14 },
  sep: { width: GUTTER },

  cardWrap: { width: CARD_W },
  bottomSpacer: { height: 24 },
});
