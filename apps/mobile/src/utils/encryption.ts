// src/utils/encryption.ts
// Option 1: Simple approach using any cast if no types exist
import SecureStorageModule from 'react-native-secure-storage';

export const SecureStorageUtil = {
  set: async (key: string, value: string): Promise<void> => {
    // We cast SecureStorageModule as any to bypass missing type declarations.
    await (SecureStorageModule as any).setItem(key, value, { encrypt: true });
  },
  get: async (key: string): Promise<string | null> => {
    return await (SecureStorageModule as any).getItem(key);
  },
};
