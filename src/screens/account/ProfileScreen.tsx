import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { Button } from '../../components/ui/Button';

export default function ProfileScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <View style={styles.avatarRow}>
          <Image
            source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=User' }}
            style={styles.avatar}
          />
          <Button variant="outline"><Text style={styles.btnTxtDark}>Change Avatar</Text></Button>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} defaultValue="John Doe" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput keyboardType="email-address" style={styles.input} defaultValue="john.doe@example.com" />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Phone</Text>
          <TextInput keyboardType="phone-pad" style={styles.input} defaultValue="+1 (555) 123-4567" />
        </View>

        <Button><Text style={styles.btnTxt}>Save Changes</Text></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff', padding: 12 },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6e8eb', borderRadius: 12, padding: 14, gap: 12 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f2f3f5' },
  field: { gap: 6 },
  label: { color: '#5f6a7d' },
  input: {
    borderWidth: 1, borderColor: '#e6e8eb', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 10, color: '#111',
  },
  btnTxt: { color: '#fff', fontWeight: '700' },
  btnTxtDark: { color: '#111', fontWeight: '700' },
});
