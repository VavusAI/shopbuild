import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Button } from '../../components/ui/Button';

const mockPaymentMethods = [
  { id: '1', brand: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: '2', brand: 'Mastercard', last4: '5555', expiry: '08/26', isDefault: false },
];

export default function PaymentMethodsScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.headerRow}>
        <Text style={styles.h2}>Payment Methods</Text>
        <Button><Text style={styles.btnTxt}>Add Payment Method</Text></Button>
      </View>

      {mockPaymentMethods.map(m => (
        <View key={m.id} style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.cardTitle}>
              {m.brand} •••• {m.last4}
            </Text>
            <View style={styles.headRight}>
              {!m.isDefault && (
                <Button variant="outline"><Text style={styles.headRightTxt}>Set as Default</Text></Button>
              )}
              <Pressable style={styles.ghost}><Text style={styles.ghostTxt}>Delete</Text></Pressable>
            </View>
          </View>
          <View style={styles.row}>
            {m.isDefault ? <Text style={styles.badge}>Default</Text> : null}
            <Text style={styles.muted}>Expires {m.expiry}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff', padding: 12, gap: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  h2: { fontSize: 20, fontWeight: '800', color: '#111' },
  btnTxt: { color: '#fff', fontWeight: '700' },
  card: { borderWidth: 1, borderColor: '#e6e8eb', borderRadius: 12, padding: 14, gap: 8 },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  headRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  headRightTxt: { color: '#111', fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  muted: { color: '#5f6a7d' },
  badge: { backgroundColor: '#f1f5f9', color: '#111', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, borderWidth: 1, borderColor: '#e5e7eb' },
  ghost: { paddingHorizontal: 8, paddingVertical: 6 },
  ghostTxt: { color: '#111', fontWeight: '600' },
});
