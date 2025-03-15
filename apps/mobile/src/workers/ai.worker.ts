/// <reference lib="webworker" />

// Import TensorFlow and initialize the React Native backend
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

// Listen for messages sent to this worker.
self.onmessage = async (e: MessageEvent<number[]>) => {
try {
    // e.data is expected to be an array of numbers.
    const inputArray = e.data;

    // Construct a 2D tensor from the input array.
    // Adjust the shape if your model expects a different input shape.
    const inputTensor = tf.tensor2d([inputArray]);

    // Load your pre-trained model.
    // Replace the URL below with your actual model.json URL.
    const model = await tf.loadLayersModel('https://your-model-url/model.json');

    // Run the model prediction.
    const prediction = model.predict(inputTensor);
    let result: number;
    if (Array.isArray(prediction)) {
    result = (prediction[0] as tf.Tensor).dataSync()[0];
    } else {
    result = (prediction as tf.Tensor).dataSync()[0];
    }

    // Post the prediction result back to the main thread.
    self.postMessage(result);
} catch (error: any) {
    // Post an error message back if something goes wrong.
    self.postMessage({ error: error.message });
}
};
