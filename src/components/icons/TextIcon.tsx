// src/components/icons/TextIcon.tsx
import React from 'react';
import { Text, TextStyle } from 'react-native';

type Name =
  | 'chevron-right'
  | 'search'
  | 'mic'
  | 'camera'
  | 'home'
  | 'tab-search'
  | 'cart'
  | 'account'
  | 'back';

const MAP: Record<Name, string> = {
  'chevron-right': '›', // U+203A
  search: '🔎',
  mic: '🎤',
  camera: '📷',
  home: '🏠',
  'tab-search': '🔍',
  cart: '🛒',
  account: '👤',
  back: '❮', // U+276E
};

export default function TextIcon({
                                   name,
                                   size = 16,
                                   color = '#111',
                                   style,
                                 }: {
  name: Name;
  size?: number;
  color?: string;
  style?: TextStyle;
}) {
  return <Text style={[{ fontSize: size, color, lineHeight: size * 1.05 }, style]}>{MAP[name]}</Text>;
}