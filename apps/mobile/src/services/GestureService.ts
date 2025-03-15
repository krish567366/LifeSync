// src/services/GestureService.ts

/**
 * GestureService.ts
 *
 * This file implements gesture handling for ARKit.
 * It listens for gestures and, based on the detected gesture,
 * performs navigation actions using the NavigationService.
 *
 * The following gestures are handled:
 *  - 'swipe_left': Navigates to the previous screen.
 *  - 'pinch': Navigates to a "ZoomScreen" (for zooming in on an AR object).
 *  - 'double_tap': Navigates to an "ARDetailScreen" (to view details about an AR object).
 *
 * Ensure you have a declaration file (e.g., src/types/react-native-arkit.d.ts) containing:
 *   declare module 'react-native-arkit';
 */

import { ARKit } from 'react-native-arkit';
import { goBack, navigate } from './NavigationService';

// Implement navigation functions using the NavigationService
export function navigateToPreviousScreen(): void {
  console.log('Navigating to the previous screen.');
  goBack();
}

export function zoomInARObject(): void {
  console.log('Zooming in on the AR object.');
  // Navigate to a screen dedicated to zooming in (adjust the screen name and params as needed)
  navigate('ZoomScreen', { zoomLevel: 2 });
}

export function selectARObject(): void {
  console.log('Selecting the AR object.');
  // Navigate to a screen that displays AR object details (adjust as needed)
  navigate('ARDetailScreen', { objectId: 'example-object-id' });
}

// Attach the gesture handler to ARKit
// We use a type cast (as any) because ARKit may not have proper TypeScript definitions for onGesture.
if (ARKit && (ARKit as any).onGesture !== undefined) {
  (ARKit as any).onGesture = (gesture: string) => {
    console.log(`Gesture detected: ${gesture}`);
    switch (gesture) {
      case 'swipe_left':
        navigateToPreviousScreen();
        break;
      case 'pinch':
        zoomInARObject();
        break;
      case 'double_tap':
        selectARObject();
        break;
      default:
        console.log(`Unhandled gesture: ${gesture}`);
    }
  };
} else {
  console.warn('ARKit.onGesture is not available. Gesture handling is disabled.');
}
