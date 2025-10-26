import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../../components/ui/Button';

const mockFollows = [
  { id: '1', type: 'seller' as const, name: 'AudioTech Store', avatar: 'https://api.dicebear.com/7.x/shapes/png?seed=audiotech', rating: 4.8 },
  { id: '2', type: 'seller' as const, name: 'Artisan Corner', avatar: 'https://api.dicebear.com/7.x/shapes/png?seed=artisan', rating: 4.9 },
  { id: '3', type: 'influencer' as const, name: 'Tech Reviewer Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Sarah' },
];

export default function FollowsScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.h2}>Following</Text>

      {mockFollows.map(f => (
        <View key={f.id} style={styles.card}>
          <View style={styles.row}>
            <Image source={{ uri: f.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{f.name}</Text>
              {f.rating ? <Text style={styles.muted}>Rating: {f.rating} ★</Text> : null}
            </View>
            <Button variant="outline"><Text style={styles.unfollowTxt}>Unfollow</Text></Button>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff', padding: 12, gap: 12 },
  h2: { fontSize: 20, fontWeight: '800', color: '#111' },
  card: { borderWidth: 1, borderColor: '#e6e8eb', borderRadius: 12, padding: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f2f3f5' },
  name: { fontWeight: '700', color: '#111' },
  muted: { color: '#5f6a7d' },
  unfollowTxt: { color: '#111', fontWeight: '700' },
});
