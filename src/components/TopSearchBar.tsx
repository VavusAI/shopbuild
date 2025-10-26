// src/components/TopSearchBar.tsx
import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// ✅ use the safe-area-context version
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  value: string;
  onChangeText: (v: string) => void;
  onCameraPress?: () => void;
  onMicPress?: () => void;
};

export default function TopSearchBar({
                                       value,
                                       onChangeText,
                                       onCameraPress,
                                       onMicPress,
                                     }: Props) {
  return (
    // edges={['top']} adds padding only above, so we don't overlap the notch/camera
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.wrap}>
        <Icon name="search" size={18} color="#666" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search or ask a question"
          placeholderTextColor="#999"
          style={styles.input}
          autoCorrect={false}
          returnKeyType="search"
        />
        <Pressable onPress={onCameraPress} style={styles.iconBtn} hitSlop={10}>
          <Icon name="camera" size={18} color="#555" />
        </Pressable>
        <Pressable onPress={onMicPress} style={styles.iconBtn} hitSlop={10}>
          <Icon name="mic" size={18} color="#555" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // header background (like Amazon’s subtle strip)
  safe: {
    backgroundColor: '#f2f2f2',
  },
  wrap: {
    marginHorizontal: 10,
    marginBottom: 8,
    // no fixed marginTop; the SafeAreaView handles it
    paddingHorizontal: 12,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    // soft shadow
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#111',
  },
  iconBtn: {
    padding: 6,
    marginLeft: 2,
  },
});
