import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Button } from '../../components/ui/Button';

const mockAddresses = [
  { id: '1', name: 'Home', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', isDefault: true },
  { id: '2', name: 'Work', street: '456 Office Blvd', city: 'New York', state: 'NY', zip: '10002', isDefault: false },
];

export default function AddressesScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.headerRow}>
        <Text style={styles.h2}>Shipping Addresses</Text>
        <Button><Text style={styles.btnTxt}>Add Address</Text></Button>
      </View>

      {mockAddresses.map(a => (
        <View key={a.id} style={styles.card}>
          <View style={styles.cardHead}>
            <View style={styles.headLeft}>
              <Text style={styles.cardTitle}>{a.name}</Text>
              {a.isDefault ? <Text style={styles.badge}>Default</Text> : null}
            </View>
            <View style={styles.actRow}>
              <Pressable style={styles.ghost}><Text style={styles.ghostTxt}>Edit</Text></Pressable>
              <Pressable style={styles.ghost}><Text style={styles.ghostTxt}>Delete</Text></Pressable>
            </View>
          </View>
          <Text style={styles.muted}>{a.street}{'\n'}{a.city}, {a.state} {a.zip}</Text>
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
  headLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  badge: { backgroundColor: '#f1f5f9', color: '#111', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, borderWidth: 1, borderColor: '#e5e7eb' },
  muted: { color: '#5f6a7d' },
  actRow: { flexDirection: 'row', gap: 4 },
  ghost: { paddingHorizontal: 8, paddingVertical: 6 },
  ghostTxt: { color: '#111', fontWeight: '600' },
});
