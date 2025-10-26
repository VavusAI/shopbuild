import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function NotificationsScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.h2}>Notification Preferences</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Email Notifications</Text>
        <Row
          title="Order Updates"
          desc="Receive notifications about your order status"
          defaultValue
        />
        <Row
          title="Promotions & Deals"
          desc="Get notified about special offers and deals"
          defaultValue
        />
        <Row
          title="Seller Messages"
          desc="Receive messages from sellers"
          defaultValue
        />
        <Row
          title="Review Reminders"
          desc="Get reminders to review your purchases"
          defaultValue={false}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>SMS Notifications</Text>
        <Row
          title="Delivery Updates"
          desc="Get SMS updates when your order is out for delivery"
          defaultValue={false}
        />
      </View>
    </View>
  );
}

function Row({ title, desc, defaultValue }: { title: string; desc: string; defaultValue?: boolean }) {
  const [v, setV] = React.useState(!!defaultValue);
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.muted}>{desc}</Text>
      </View>
      <Switch value={v} onValueChange={setV} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff', padding: 12, gap: 12 },
  h2: { fontSize: 20, fontWeight: '800', color: '#111' },
  card: { borderWidth: 1, borderColor: '#e6e8eb', borderRadius: 12, padding: 14, gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 4 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 },
  rowTitle: { fontWeight: '600', color: '#111' },
  muted: { color: '#5f6a7d' },
});
