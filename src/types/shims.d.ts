declare module 'react-native-mmkv' {
  export class MMKV {
    constructor(config?: { id?: string; path?: string; encryptionKey?: string });
    getString(key: string): string | undefined;
    set(key: string, value: string | number | boolean): void;
    delete(key: string): void;
  }
}
declare module 'react-native-config' {
  const Config: Record<string, string | undefined>;
  export default Config;
}
