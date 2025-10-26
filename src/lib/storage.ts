// Async key-value helpers (promise-based)
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async getString(key: string): Promise<string | undefined> {
    const v = await AsyncStorage.getItem(key);
    return v ?? undefined;
  },
  async set(key: string, value: string | number | boolean) {
    await AsyncStorage.setItem(key, String(value));
  },
  async delete(key: string) {
    await AsyncStorage.removeItem(key);
  },
};
