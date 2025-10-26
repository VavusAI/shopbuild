// src/components/TopSearchBar.tsx
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextIcon from './icons/TextIcon';

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
        <TextIcon name="search" size={18} color="#777" style={styles.leftIcon} />
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
          <TextIcon name="camera" size={18} color="#111" />
        </Pressable>
        <Pressable style={[styles.iconBtn, { marginRight: 4 }]} hitSlop={10} onPress={() => {}}>
          <TextIcon name="mic" size={18} color="#111" />
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
