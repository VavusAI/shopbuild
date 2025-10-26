import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useQuery } from '@tanstack/react-query';
import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/Skeletons/ProductCardSkeleton';
import { Button } from '../components/ui/Button';
import TopSearchBar from '../components/TopSearchBar';
import { PRODUCTS_MOCK } from '../mocks/products';

const CARD_GUTTER = 12;
const SCREEN_W = Dimensions.get('window').width;
const CARD_W = Math.min(280, Math.max(220, SCREEN_W * 0.72));
const SKELETON_COUNT = 6;

// simple horizontal separator at module scope
const HSeparator = () => <View style={styles.hSep} />;

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const { data, isLoading, isFetching, refetch, isError } = useQuery({
    queryKey: ['catalog'],
    queryFn: fetchCatalog,
    staleTime: 60_000,
  });

  // Prefer network data; otherwise fall back to mocks (so we never render an empty page)
  const network = useMemo<Product[]>(
    () => data?.products ?? [],
    [data]
  );

  const base = useMemo<Product[]>(
    () => (network.length ? network : PRODUCTS_MOCK),
    [network]
  );

  // price helpers
  const priceOf = (p: Product) =>
    p?.variants?.[0]?.price?.amount ?? p?.minPrice?.amount ?? 0;
  const compareOf = (p: Product) =>
    p?.variants?.[0]?.compareAtPrice?.amount ?? undefined;

  // search filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(p =>
      [p.title, p.brand].filter(Boolean).some(t => t!.toLowerCase().includes(q))
    );
  }, [base, query]);

  // sections
  const deals = useMemo(
    () => filtered.filter(p => (compareOf(p) ?? 0) > priceOf(p)),
    [filtered]
  );
  const trending = useMemo(
    () => filtered.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)),
    [filtered]
  );
  const handmade = useMemo(() => {
    const tagged = filtered.filter(
      (p: any) =>
        p?.badge === 'handmade' ||
        p?.tags?.includes?.('handmade') ||
        p?.attributes?.some?.((a: any) => a?.name?.toLowerCase() === 'handmade')
    );
    return (tagged.length ? tagged : filtered.slice(0, 4)).map(p => ({
      ...p,
      badge: (p as any).badge ?? ('handmade' as const),
    }));
  }, [filtered]);

  // first load skeleton
  if (isLoading && !network.length) {
    return (
      <View style={styles.page}>
        <TopSearchBar value={query} onChangeText={setQuery} />
        <SkeletonGrid />
      </View>
    );
  }

  // main page (even if API failed; we’ll show a tiny banner)
  return (
    <FlatList
      style={styles.page}
      data={[{ key: 'content' }]}
      keyExtractor={i => i.key}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={<TopSearchBar value={query} onChangeText={setQuery} />}
      renderItem={() => (
        <View>
          <CategoryNav active={category} onSelect={setCategory} />

          {/* Optional inline warning if API failed but we’re showing mocks */}
          {isError && !network.length ? (
            <View style={styles.banner}>
              <Text style={styles.bannerTxt}>
                You’re viewing sample products while we reconnect…
              </Text>
              <ActivityIndicator size="small" />
            </View>
          ) : null}

          <View style={styles.hero}>
            <View style={styles.heroInner}>
              <Text style={styles.h1}>Discover Amazing Products from Sellers You Love</Text>
              <Text style={styles.h2}>
                Shop millions of unique items from independent sellers and top brands
              </Text>
              <Button size="lg" style={styles.ctaRow}>
                <Text style={styles.ctaTxt}>Start Shopping</Text>
                <Icon name="chevron-right" size={16} color="#fff" />
              </Button>
            </View>
          </View>

          <SectionHeader title="Today’s Deals" actionLabel="See more deals" />
          <Carousel data={deals} getPrice={priceOf} getCompare={compareOf} />

          <SectionHeader title="Trending Now" actionLabel="See all" tint />
          <Carousel data={trending} tint getPrice={priceOf} getCompare={compareOf} />

          <SectionHeader
            title="Handmade & Unique"
            subtitle="Discover one-of-a-kind items from artisans"
            actionLabel="Explore"
          />
          <Carousel data={handmade} getPrice={priceOf} getCompare={compareOf} />

          <View style={styles.bottomPad} />
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => {
            refetch().catch(() => {});
          }}
        />
      }
    />
  );
}

/* ------- presentation helpers ------- */

function SectionHeader({
                         title,
                         subtitle,
                         actionLabel,
                         tint,
                       }: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  tint?: boolean;
}) {
  return (
    <View style={[styles.sectionHeader, tint && styles.sectionHeaderTint]}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.sectionSub}>{subtitle}</Text>}
      </View>
      {!!actionLabel && (
        <Button variant="link" style={styles.linkRow}>
          <Text style={styles.linkTxt}>{actionLabel}</Text>
          <Icon name="chevron-right" size={14} color="#111" />
        </Button>
      )}
    </View>
  );
}

function Carousel({
                    data,
                    tint,
                    getPrice,
                    getCompare,
                  }: {
  data: Product[];
  tint?: boolean;
  getPrice: (p: Product) => number;
  getCompare: (p: Product) => number | undefined;
}) {
  if (!data?.length) return null;

  return (
    <View style={[styles.carouselWrap, tint && styles.carouselTint]}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
        ItemSeparatorComponent={HSeparator}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.cardWrap,
              { width: CARD_W },
              index === data.length - 1 ? styles.lastCard : null,
            ]}
          >
            <ProductCard
              id={item.id}
              image={item.images?.[0]?.url ?? (item as any).image ?? ''}
              title={item.title}
              price={getPrice(item)}
              originalPrice={getCompare(item)}
              rating={item.rating ?? 0}
              reviewCount={item.ratingCount ?? 0}
              seller={item.brand ?? 'Seller'}
              stockLevel={item.variants?.[0]?.inStock ? 'in-stock' : 'out-of-stock'}
              badge={(item as any).badge}
            />
          </View>
        )}
      />
    </View>
  );
}

function SkeletonGrid() {
  return (
    <FlatList
      data={Array.from({ length: SKELETON_COUNT })}
      keyExtractor={(_, i) => `s-${i}`}
      numColumns={2}
      columnWrapperStyle={styles.skelColumn}
      contentContainerStyle={styles.skelContent}
      renderItem={() => (
        <View style={styles.cardFlex}>
          <ProductCardSkeleton />
        </View>
      )}
    />
  );
}

/* ------- styles ------- */

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  bottomPad: { height: 20 },

  banner: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF7D6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F2E4A6',
  },
  bannerTxt: { color: '#7A6400', fontWeight: '600', flex: 1 },

  hero: {
    backgroundColor: '#f3f6ff',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  heroInner: { maxWidth: 720 },
  ctaRow: { flexDirection: 'row', gap: 8, alignSelf: 'flex-start', marginTop: 8 },
  ctaTxt: { color: '#fff', fontWeight: '700' },
  h1: { fontSize: 24, fontWeight: '800', marginBottom: 6 },
  h2: { color: '#666' },

  sectionHeader: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderTint: { backgroundColor: '#fafafa' },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  sectionSub: { color: '#666', marginTop: 2 },
  linkRow: { flexDirection: 'row', gap: 6 },
  linkTxt: { color: '#111', fontWeight: '700' },

  carouselWrap: { paddingBottom: 8 },
  carouselTint: { backgroundColor: '#fafafa' },
  carouselContent: { paddingHorizontal: 12 },
  cardWrap: {},
  lastCard: { marginRight: 12 },
  hSep: { width: CARD_GUTTER },

  skelColumn: { gap: 12 },
  skelContent: { paddingHorizontal: 12, rowGap: 12 },
  cardFlex: { flex: 1 },
});
