// src/components/ui/Button.tsx
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

type Variant = 'default'|'destructive'|'outline'|'secondary'|'ghost'|'link';
type Size = 'default'|'sm'|'lg'|'icon';

export function Button({
                         title,
                         onPress,
                         variant='default',
                         size='default',
                         style,
                         disabled,
                         children,
                       }: {
  title?: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  style?: ViewStyle;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        pressed && { opacity: 0.85 },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      {children ?? (
        <Text
          style={[
            styles.text,
            (variant === 'outline' || variant === 'link') && { color: '#111' },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontWeight: '600' },
});

const variantStyles = StyleSheet.create({
  default: { backgroundColor: '#111' },
  destructive: { backgroundColor: '#d44' },
  outline: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e5e5' },
  secondary: { backgroundColor: '#eee' },
  ghost: { backgroundColor: 'transparent' },
  link: { backgroundColor: 'transparent' },
});

const sizeStyles = StyleSheet.create({
  default: { paddingHorizontal: 16, paddingVertical: 10 },
  sm: { paddingHorizontal: 12, paddingVertical: 8 },
  lg: { paddingHorizontal: 20, paddingVertical: 12 },
  icon: { width: 40, height: 40 },
});
