import React, { useMemo } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../stores/cart';

type Money = { amount: number; currency: string };

function fmt(amountCents: number, currency = 'USD') {
  const amount = (amountCents ?? 0) / 100;
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

export default function CartScreen() {
  const nav = useNavigation();
  const items = useCartStore(s => s.items);
  const setQty = useCartStore(s => s.setQty);
  const remove = useCartStore(s => s.remove);
  const clear = useCartStore(s => s.clear);

  // Derived totals (similar to the web cart)
  const currency = items[0]?.price?.currency ?? 'USD';

  const { subtotal, savings, estTax, total } = useMemo(() => {
    let sub = 0;
    let save = 0;
    for (const it of items) {
      const unit = it.price?.amount ?? 0;
      // If you want to compute savings from a compareAt price,
      // stash it on the item later; for now treat 0
      const compareAt = (it as any)?.compareAt?.amount ?? 0;
      sub += unit * it.qty;
      if (compareAt > unit) save += (compareAt - unit) * it.qty;
    }
    // simple 7.5% est tax (tweak to match your web app if needed)
    const tax = Math.round(sub * 0.075);
    const tot = sub + tax;
    return { subtotal: sub, savings: save, estTax: tax, total: tot };
  }, [items]);

  const empty = !items.length;

  // Line item UI
  const renderItem = ({ item }: { item: typeof items[number] }) => {
    const unit = item.price?.amount ?? 0;
    const compareAt = (item as any)?.compareAt?.amount ?? 0;
    const showCompare = compareAt > unit;

    return (
      <View style={styles.line}>
        <Image
          source={{ uri: item.image ?? '' }}
          style={styles.lineImg}
          resizeMode="cover"
        />
        <View style={styles.lineBody}>
          <Text style={styles.lineTitle} numberOfLines={2}>{item.title}</Text>
          {(item as any)?.seller ? (
            <Text style={styles.seller}>Sold by {(item as any).seller}</Text>
          ) : null}

          <View style={styles.priceRow}>
            <Text style={styles.price}>{fmt(unit, currency)}</Text>
            {showCompare ? (
              <Text style={styles.compare}>{fmt(compareAt, currency)}</Text>
            ) : null}
          </View>

          <View style={styles.controlsRow}>
            <QtyStepper
              qty={item.qty}
              onDec={() => setQty(item.id, Math.max(0, item.qty - 1))}
              onInc={() => setQty(item.id, item.qty + 1)}
            />
            <Pressable style={styles.removeBtn} onPress={() => remove(item.id)} hitSlop={10}>
              <Text style={styles.removeTxt}>🗑️ Remove</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  if (empty) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.muted}>Browse the catalog and add something you like.</Text>
        <View style={{ height: 12 }} />
        <Button size="lg" onPress={() => (nav as any)?.navigate?.('Home')}>
          <Text style={styles.ctaText}>Start shopping</Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <FlatList
        data={items}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listPad}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />

      {/* Order summary footer (sticky) */}
      <View style={styles.summaryWrap}>
        <View style={styles.summaryRow}>
          <Text style={styles.muted}>Subtotal</Text>
          <Text style={styles.bold}>{fmt(subtotal, currency)}</Text>
        </View>
        {!!savings && (
          <View style={styles.summaryRow}>
            <Text style={styles.savingsLbl}>Savings</Text>
            <Text style={styles.savingsVal}>−{fmt(savings, currency)}</Text>
          </View>
        )}
        <View style={styles.summaryRow}>
          <Text style={styles.muted}>Estimated tax</Text>
          <Text style={styles.muted}>{fmt(estTax, currency)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLbl}>Total</Text>
          <Text style={styles.totalVal}>{fmt(total, currency)}</Text>
        </View>

        <View style={styles.summaryCtas}>
          <Button size="lg" style={{ flex: 1 }} onPress={() => (nav as any)?.navigate?.('Checkout')}>
            <Text style={styles.ctaText}>Checkout</Text>
          </Button>
          <Button
            size="lg"
            variant="outline"
            style={{ flex: 1 }}
            onPress={() => clear()}
          >
            <Text style={styles.clearTxt}>Clear cart</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

/** Tiny qty stepper (text glyphs; no vector icons) */
function QtyStepper({
                      qty,
                      onDec,
                      onInc,
                    }: {
  qty: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <View style={styles.stepper}>
      <Pressable onPress={onDec} hitSlop={10} style={[styles.stepBtn, qty <= 1 && styles.stepDisabled]}>
        <Text style={styles.stepGlyph}>−</Text>
      </Pressable>
      <Text style={styles.stepQty}>{qty}</Text>
      <Pressable onPress={onInc} hitSlop={10} style={styles.stepBtn}>
        <Text style={styles.stepGlyph}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  listPad: { paddingHorizontal: 12, paddingTop: 8, paddingBottom: 120 },
  sep: { height: 12 },

  line: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e6e8eb',
    borderRadius: 12,
    backgroundColor: '#fff',
    gap: 12,
  },
  lineImg: { width: 96, height: 96, borderRadius: 8, backgroundColor: '#f2f3f5' },
  lineBody: { flex: 1, gap: 6 },
  lineTitle: { fontSize: 15, fontWeight: '700', color: '#111' },
  seller: { color: '#5f6a7d', fontSize: 12 },

  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  price: { fontWeight: '800', fontSize: 16, color: '#111' },
  compare: { color: '#8a8a8a', textDecorationLine: 'line-through' },

  controlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  removeBtn: { paddingVertical: 6, paddingHorizontal: 8 },
  removeTxt: { color: '#111', fontWeight: '600' },

  // stepper
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  stepBtn: {
    width: 36,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDisabled: { opacity: 0.5 },
  stepGlyph: { fontSize: 18, color: '#111', fontWeight: '800' },
  stepQty: { minWidth: 28, textAlign: 'center', fontWeight: '700', color: '#111' },

  // summary
  summaryWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#e6e8eb',
    backgroundColor: '#fff',
    gap: 8,
  },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bold: { fontWeight: '700', color: '#111' },
  muted: { color: '#5f6a7d' },
  savingsLbl: { color: '#0a7', fontWeight: '700' },
  savingsVal: { color: '#0a7', fontWeight: '700' },
  totalRow: { marginTop: 2, paddingTop: 6, borderTopWidth: 1, borderColor: '#eee' },
  totalLbl: { fontWeight: '800', fontSize: 16, color: '#111' },
  totalVal: { fontWeight: '800', fontSize: 16, color: '#111' },

  summaryCtas: { flexDirection: 'row', gap: 10, marginTop: 6 },
  ctaText: { color: '#fff', fontWeight: '700' },
  clearTxt: { color: '#111', fontWeight: '700' },

  // empty
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: '#111' },
});
