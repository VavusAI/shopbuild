import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

export default function CTAButton({
                                    title,
                                    onPress,
                                    style,
                                    disabled,
                                  }: { title: string; onPress: () => void; style?: ViewStyle; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        pressed && { opacity: 0.85 },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btn: { backgroundColor: '#111', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  text: { color: 'white', fontWeight: '600' },
});
