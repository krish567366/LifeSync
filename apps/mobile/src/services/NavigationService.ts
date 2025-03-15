// src/services/NavigationService.ts

/**
 * NavigationService.ts
 *
 * This file centralizes navigation logic for the LifeSync app.
 * It exports a global navigationRef and helper functions:
 *   - navigate: To navigate to a specified screen with optional parameters.
 *   - goBack: To navigate back to the previous screen.
 *   - reset: To reset the navigation state (e.g. after logout).
 *
 * Use these functions throughout your app (including in services like GestureService)
 * to perform navigation actions outside of React component context.
 */

import * as React from 'react';
import { CommonActions, NavigationContainerRef } from '@react-navigation/native';

// Create a navigation reference to be attached to NavigationContainer in App.tsx
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

/**
 * Navigate to a specific screen.
 * @param name - The name of the target screen.
 * @param params - Optional parameters to pass to the target screen.
 */
export function navigate(name: string, params?: any): void {
if (navigationRef.current) {
    navigationRef.current.dispatch(
    CommonActions.navigate({ name, params })
    );
} else {
    console.warn('Navigation reference is not available.');
}
}

/**
 * Go back to the previous screen.
 */
export function goBack(): void {
if (navigationRef.current) {
    navigationRef.current.dispatch(CommonActions.goBack());
} else {
    console.warn('Navigation reference is not available.');
}
}

/**
 * Reset the navigation state.
 * Useful for actions like logging out.
 * @param params - An object containing the reset index and routes.
 */
export function reset(params: { index: number; routes: { name: string; params?: any }[] }): void {
if (navigationRef.current) {
    navigationRef.current.dispatch(CommonActions.reset(params));
} else {
    console.warn('Navigation reference is not available.');
}
}
