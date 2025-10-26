// src/stores/cart.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'cart:v1';

export type Money = { amount: number; currency: string };

export type CartItem = {
  id: string;          // product id
  title: string;
  image?: string | null;
  price: Money;        // cents + currency
  qty: number;
};

type CartState = {
  items: CartItem[];
  hydrate: () => Promise<void>;
  add: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

async function load(): Promise<CartItem[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

async function save(items: CartItem[]) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // ignore write errors for now
  }
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  hydrate: async () => {
    const items = await load();
    set({ items });
  },

  add: (incoming) => {
    const qty = Math.max(1, incoming.qty ?? 1);
    const items = [...get().items];
    const ix = items.findIndex((i) => i.id === incoming.id);
    if (ix >= 0) {
      items[ix] = { ...items[ix], qty: items[ix].qty + qty };
    } else {
      items.push({ ...incoming, qty });
    }
    set({ items });
    save(items).catch(() => {});
  },

  setQty: (id, qty) => {
    const items = get().items
      .map((i) => (i.id === id ? { ...i, qty } : i))
      .filter((i) => i.qty > 0);
    set({ items });
    save(items).catch(() => {});
  },

  remove: (id) => {
    const items = get().items.filter((i) => i.id !== id);
    set({ items });
    save(items).catch(() => {});
  },

  clear: () => {
    set({ items: [] });
    save([]).catch(() => {});
  },
}));
