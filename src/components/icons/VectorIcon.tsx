// src/components/icons/VectorIcon.tsx
import React from 'react';
import * as L from 'lucide-react-native';

// Central, app-wide icon map. Add more names as you need them.
const ICONS = {
  // navigation / UI
  'arrow-left': L.ArrowLeft,
  'chevron-right': L.ChevronRight,
  'share': L.Share2,
  'cart': L.ShoppingCart,
  'search': L.Search,
  'camera': L.Camera,
  'mic': L.Mic,

  // categories
  'electronics': L.Smartphone,
  'fashion': L.Shirt,
  'home-garden': L.Home,
  'beauty-health': L.Sparkles,
  'sports-outdoors': L.Dumbbell,
} as const;

export type VectorIconName = keyof typeof ICONS;

export default function VectorIcon({
                                     name,
                                     size = 20,
                                     color = '#111',
                                     strokeWidth = 2,
                                   }: {
  name: VectorIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp size={size} color={color} strokeWidth={strokeWidth} />;
}
