// src/components/TopSearchBar.tsx
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VectorIcon from './icons/VectorIcon';

export default function TopSearchBar({
                                       value,
                                       onChangeText,
                                       onSubmitEditing,
                                     }: {
  value: string;
  onChangeText: (t: string) => void;
  onSubmitEditing?: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingTop: Math.max(insets.top, 8) }]}>
      <View style={styles.row}>
        <VectorIcon name="search" size={16} color="#5f6a7d" />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search or ask a question"
          placeholderTextColor="#9aa3ad"
          returnKeyType="search"
          onSubmitEditing={onSubmitEditing}
        />
        <Pressable style={styles.iconBtn} hitSlop={10} onPress={() => {}}>
          <VectorIcon name="camera" size={16} color="#5f6a7d" />
        </Pressable>
        <Pressable style={[styles.iconBtn, { marginRight: 4 }]} hitSlop={10} onPress={() => {}}>
          <VectorIcon name="mic" size={16} color="#5f6a7d" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    paddingBottom: 8,
  },
  row: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e6e8eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: { marginLeft: 10 },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111',
  },
  iconBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
