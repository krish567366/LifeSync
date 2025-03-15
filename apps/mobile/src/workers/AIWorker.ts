/// <reference lib="webworker" />
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

// Create a new worker instance.
// If your bundler supports the new URL() syntax, use it to load the worker.
// Otherwise, adjust according to your setup.
const worker = new Worker(new URL('./ai.worker.ts'));

/**
 * Sends the input tensor data to the worker and returns a Promise that resolves
 * with the worker's prediction result.
 *
 * @param input - A TensorFlow tensor containing input data.
 * @returns A Promise that resolves to the model's prediction result.
 */
export const runModelInWorker = (input: tf.Tensor): Promise<any> => {
  return new Promise((resolve, reject) => {
    worker.onmessage = (e: MessageEvent) => {
      resolve(e.data);
    };
    worker.onerror = (e: ErrorEvent) => {
      reject(e);
    };
    // tf.Tensor is not directly transferable.
    // Here, we send a serializable representation of the tensor (its data as a typed array).
    worker.postMessage(input.dataSync());
  });
};
