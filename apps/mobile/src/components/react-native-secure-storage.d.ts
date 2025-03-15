declare module 'react-native-secure-storage' {
    export type Options = {
    encrypt?: boolean;
    };

    export function setItem(key: string, value: string, options?: Options): Promise<void>;
    export function getItem(key: string): Promise<string | null>;

    const SecureStorage: {
    setItem: typeof setItem;
    getItem: typeof getItem;
    };

    export default SecureStorage;
}
