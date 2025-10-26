import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProductCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={[styles.box, { aspectRatio: 1 }]} />
      <View style={styles.pad}>
        <View style={[styles.line, { width: '40%' }]} />
        <View style={[styles.line, { width: '80%' }]} />
        <View style={[styles.line, { width: '60%' }]} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', borderColor: '#eee', borderWidth: 1 },
  box: { width: '100%', backgroundColor: '#f0f0f0' },
  pad: { padding: 10, gap: 8 },
  line: { height: 10, backgroundColor: '#f0f0f0', borderRadius: 6 },
});
