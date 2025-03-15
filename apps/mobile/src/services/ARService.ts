import { ARKit } from 'react-native-arkit';
import { Vector3 } from 'three';

// Measure distance between two points
export const measureDistance = (point1: Vector3, point2: Vector3) => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) +
    Math.pow(point2.y - point1.y, 2) +
    Math.pow(point2.z - point1.z, 2)
  );
};