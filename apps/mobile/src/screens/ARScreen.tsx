import React, { useRef } from 'react';
import { ARKit } from 'react-native-arkit';
import { detectObjects } from '../services/ObjectRecognition';

export default function ARScreen() {
  const arRef = useRef<ARKit>();

  return (
    <ARKit
      ref={arRef}
      onTap={async (event) => {
        const object = await detectObjects(event.camera.image);
        alert(`Detected: ${object}`);
      }}
    />
  );
}