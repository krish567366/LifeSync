import { NativeModules } from 'react-native';
const { ARKitManager } = NativeModules;

export const create3DMap = async () => {
  try {
    const depthMap = await ARKitManager.getDepthMap();
    const mesh = await ARKitManager.getSceneMesh();
    return { depthMap, mesh };
  } catch (error) {
    console.error('AR Depth Error:', error);
  }
};

// Usage in ARScreen.tsx
ARKitManager.startConfiguration({ depthEnabled: true });