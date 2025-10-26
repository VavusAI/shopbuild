import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { fetchCatalog } from '../services/shop';
import type { Product } from '../types/shop';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/Skeletons/ProductCardSkeleton';
import { Button } from '../components/ui/Button';
import TopSearchBar from '../components/TopSearchBar';
import { PRODUCTS_MOCK } from '../mocks/products';
import TextIcon from '../components/icons/TextIcon';

const CARD_GUTTER = 12;
const H_PADDING = 12;
const SCREEN_W = Dimensions.get('window').width;
const CARD_W = (SCREEN_W - H_PADDING * 2 - CARD_GUTTER) / 2;
const SKELETON_COUNT = 6 as const;

const HSeparator = () => <View style={styles.hSep} />;

export default function HomeScreen() {
  const nav = useNavigation<any>(); // <-- add this line

  const [query, setQuery] = useState('');
  const [zip, setZip] = useState<string | null>(null);
  const [zipEditing, setZipEditing] = useState(false);

  const [activeTab, setActiveTab] = useState<'deals' | 'trending' | 'top' | 'following'>('deals');

  const { data, isLoading, isFetching, refetch, isError } = useQuery({
    queryKey: ['catalog'],
    queryFn: fetchCatalog,
    staleTime: 60_000,
  });

  // Prefer network data; otherwise fall back to mocks
  const network = useMemo<Product[]>(() => data?.products ?? [], [data]);
  const base = useMemo<Product[]>(
    () => (network.length ? network : PRODUCTS_MOCK),
    [network]
  );

  // price helpers
  const priceOf = (p: Product) =>
    p?.variants?.[0]?.price?.amount ?? p?.minPrice?.amount ?? 0;
  const compareOf = (p: Product) =>
    p?.variants?.[0]?.compareAtPrice?.amount ?? undefined;

  // ---- delivery filter by ZIP (best-effort; falls back to allow) ----
  const byZip = useMemo(() => {
    if (!zip) return base;
    const z = zip.replace(/\D/g, '');
    const zip3 = z.slice(0, 3);
    const zip2 = z.slice(0, 2);

    const canShipTo = (p: Product): boolean => {
      const anyP: any = p as any;
      const zips: string[] | undefined = anyP?.shipping?.zips || anyP?.shipsToZips;
      if (Array.isArray(zips) && zips.length) {
        return zips.some((entry: string) => {
          const e = entry.replace(/\D/g, '');
          return e === z || (e.length === 3 && e === zip3) || (e.length === 2 && e === zip2);
        });
      }

      const zones: string[] | undefined = anyP?.shipping?.zones || anyP?.zipZones;
      if (Array.isArray(zones) && zones.length) {
        return zones.some((pat: string) => {
          const clean = pat.toLowerCase();
          if (clean.endsWith('xxx')) return zip3 && clean.startsWith(zip3);
          if (clean.endsWith('*')) return clean.slice(0, -1) === z.slice(0, clean.length - 1);
          return clean === z;
        });
      }

      const regions: string[] | undefined =
        anyP?.shipping?.regions || anyP?.deliveryRegions || anyP?.regions;
      if (Array.isArray(regions) && regions.length) {
        return regions.includes('US') || regions.includes('US-*');
      }

      return true;
    };

    return base.filter(canShipTo);
  }, [base, zip]);

  // ---- search filter (after ZIP) ----
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return byZip;
    return byZip.filter(p =>
      [p.title, p.brand].filter(Boolean).some(t => t!.toLowerCase().includes(q))
    );
  }, [byZip, query]);

  // ---- sections from filtered ----
  const deals = useMemo(
    () => filtered.filter(p => (compareOf(p) ?? 0) > priceOf(p)),
    [filtered]
  );
  const trending = useMemo(
    () => filtered.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)),
    [filtered]
  );
  const topRated = useMemo(
    () => filtered.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 20),
    [filtered]
  );
  const following = useMemo(
    () => filtered.slice(0, 20),
    [filtered]
  );

  const chosenList = activeTab === 'deals' ? deals
    : activeTab === 'trending' ? trending
      : activeTab === 'top' ? topRated
        : following;

  if (isLoading && !network.length) {
    return (
      <View style={styles.page}>
        <TopSearchBar value={query} onChangeText={setQuery} />
        <SkeletonGrid />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.page}
      data={[{ key: 'content' }]}
      keyExtractor={i => i.key}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={<TopSearchBar value={query} onChangeText={setQuery} />}
      renderItem={() => (
        <View>

          {/* ZIP + Tabs row */}
          <View style={styles.filtersRow}>
            {/* ZIP chip (first) */}
            {zipEditing ? (
              <View style={styles.zipEditWrap}>
                <TextInput
                  autoFocus
                  keyboardType="number-pad"
                  maxLength={10}
                  placeholder="ZIP"
                  placeholderTextColor="#9aa3ad"
                  value={zip ?? ''}
                  onChangeText={(t) => setZip(t)}
                  style={styles.zipInput}
                />
                <Pressable style={styles.zipBtn} onPress={() => setZipEditing(false)}>
                  <Text style={styles.zipBtnTxt}>Save</Text>
                </Pressable>
                {!!zip && (
                  <Pressable style={[styles.zipBtn, { backgroundColor: '#f1f5f9', borderColor: '#e5e7eb' }]} onPress={() => { setZip(null); setZipEditing(false); }}>
                    <Text style={[styles.zipBtnTxt, { color: '#111' }]}>Clear</Text>
                  </Pressable>
                )}
              </View>
            ) : (
              <Pressable style={styles.chip} onPress={() => setZipEditing(true)}>
                <Text style={styles.chipTxt}>
                  {zip ? zip : 'ZIP'}
                </Text>
              </Pressable>
            )}

            {/* Tabs */}
            <Pressable style={[styles.chip, activeTab==='deals' && styles.chipActive]} onPress={() => setActiveTab('deals')}>
              <Text style={[styles.chipTxt, activeTab==='deals' && styles.chipTxtActive]}>Deals</Text>
            </Pressable>
            <Pressable style={[styles.chip, activeTab==='trending' && styles.chipActive]} onPress={() => setActiveTab('trending')}>
              <Text style={[styles.chipTxt, activeTab==='trending' && styles.chipTxtActive]}>Trending</Text>
            </Pressable>
            <Pressable style={[styles.chip, activeTab==='top' && styles.chipActive]} onPress={() => setActiveTab('top')}>
              <Text style={[styles.chipTxt, activeTab==='top' && styles.chipTxtActive]}>Top Rated</Text>
            </Pressable>
            <Pressable style={[styles.chip, activeTab==='following' && styles.chipActive]} onPress={() => setActiveTab('following')}>
              <Text style={[styles.chipTxt, activeTab==='following' && styles.chipTxtActive]}>Following</Text>
            </Pressable>
          </View>

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
              <Button size="lg" style={styles.ctaRow} onPress={() => (nav as any)?.navigate?.('Categories')}>
                <Text style={styles.ctaTxt}>Start Shopping</Text>
                <TextIcon name="chevron-right" size={16} color="#fff" />
              </Button>
            </View>
          </View>

          <SectionHeader
            title={
              activeTab === 'deals' ? 'Today’s Deals'
                : activeTab === 'trending' ? 'Trending Now'
                  : activeTab === 'top' ? 'Top Rated'
                    : 'From People You Follow'
            }
            actionLabel="See all"
          />
          <Carousel data={chosenList} getPrice={priceOf} getCompare={compareOf} />

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

function SectionHeader({
                         title,
                         subtitle,
                         actionLabel,
                       }: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.sectionSub}>{subtitle}</Text>}
      </View>
      {!!actionLabel && (
        <Button variant="link" style={styles.linkRow}>
          <Text style={styles.linkTxt}>{actionLabel}</Text>
          <TextIcon name="chevron-right" size={14} color="#111" />
        </Button>
      )}
    </View>
  );
}

function Carousel({
                    data,
                    getPrice,
                    getCompare,
                  }: {
  data: Product[];
  getPrice: (p: Product) => number;
  getCompare: (p: Product) => number | undefined;
}) {
  if (!data?.length) return null;

  return (
    <View style={styles.carouselWrap}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
        ItemSeparatorComponent={HSeparator}
        snapToInterval={CARD_W + CARD_GUTTER}
        snapToAlignment="start"
        decelerationRate="fast"
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

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  bottomPad: { height: 20 },

  filtersRow: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  chipTxt: { color: '#5f6a7d', fontWeight: '600' },
  chipTxtActive: { color: '#fff' },

  zipEditWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  zipInput: {
    minWidth: 84,
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: '#111',
  },
  zipBtn: {
    backgroundColor: '#111',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#111',
  },
  zipBtnTxt: { color: '#fff', fontWeight: '700' },

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
  h2: { color: '#5f6a7d' },

  sectionHeader: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  sectionSub: { color: '#5f6a7d', marginTop: 2 },
  linkRow: { flexDirection: 'row', gap: 6 },
  linkTxt: { color: '#111', fontWeight: '700' },

  carouselWrap: { paddingBottom: 8 },
  carouselContent: { paddingHorizontal: H_PADDING },
  cardWrap: {},
  lastCard: { marginRight: H_PADDING },
  hSep: { width: CARD_GUTTER },

  skelColumn: { gap: 12 },
  skelContent: { paddingHorizontal: 12, rowGap: 12 },
  cardFlex: { flex: 1 },
});
