// src/components/VictoryWrapper.tsx
import React from 'react';
import VictoryNative from 'victory-native';

// Extract VictoryBar and VictoryPie from the default export using a type assertion
export const VictoryBar: React.ComponentType<any> = (VictoryNative as any).VictoryBar;
export const VictoryPie: React.ComponentType<any> = (VictoryNative as any).VictoryPie;
