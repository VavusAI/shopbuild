import { create } from 'zustand';
import { MMKV } from 'react-native-mmkv';

type CartItem = { id: string; title: string; price: number; image?: string; qty: number };
type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const storage = new MMKV({ id: 'cart' });
const KEY = 'cart/items';

function load(): CartItem[] {
  try { return JSON.parse(storage.getString(KEY) ?? '[]'); } catch { return []; }
}
function save(items: CartItem[]) { storage.set(KEY, JSON.stringify(items)); }

export const useCartStore = create<CartState>((set, get) => ({
  items: load(),
  add: (item) => set(s => {
    const i = s.items.findIndex(x => x.id === item.id);
    const next = [...s.items];
    if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + item.qty };
    else next.push(item);
    save(next); return { items: next };
  }),
  remove: (id) => set(s => { const next = s.items.filter(x => x.id !== id); save(next); return { items: next }; }),
  setQty: (id, qty) => set(s => {
    const next = s.items.map(x => x.id === id ? { ...x, qty } : x);
    save(next); return { items: next };
  }),
  clear: () => set(() => { save([]); return { items: [] }; }),
}));
