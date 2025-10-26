import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CartItem = { variantId: string; qty: number };
type CartState = {
  items: CartItem[];
  add: (i: CartItem) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  _hydrated: boolean;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      _hydrated: false,
      add: (i) => set(s => ({ items: [...s.items, i] })),
      setQty: (id, qty) =>
        set(s => ({ items: s.items.map(x => x.variantId === id ? { ...x, qty } : x) })),
      remove: (id) => set(s => ({ items: s.items.filter(x => x.variantId !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // mark hydrated so UI can avoid flashes if you want
        if (state) state._hydrated = true;
      },
      partialize: (s) => ({ items: s.items }), // don’t persist _hydrated
    }
  )
);
