import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { ARKit } from 'react-native-arkit';

export default function ARScreen() {
  const arRef = useRef(null);

  const measureDistance = () => {
    if (arRef.current) {
      arRef.current.getCameraPosition().then(position => {
        console.log('Current AR Camera Position:', position);
        // Add measurement logic here
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ARKit
        ref={arRef}
        style={{ flex: 1 }}
        debug
        planeDetection
        lightEstimation
        onPlaneDetected={(event) => console.log('Plane detected:', event)}
      />
      <Button
        title="Measure Distance"
        onPress={measureDistance}
        color="#00FF88"
      />
    </View>
  );
}