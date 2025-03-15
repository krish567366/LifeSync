// src/services/HealthService.ts

import AppleHealthKit from 'react-native-health'; // Default export from react-native-health
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native'; // Initializes the React Native backend

// Define types for the health samples and overall health data.
export type HealthSample = {
  value: number;
  startDate: string;
  endDate: string;
};

export type HealthData = {
  heartRates: HealthSample[];
  // Add additional metrics if needed.
};

/**
 * A helper function to wrap the callback-based API of AppleHealthKit.getHeartRateSamples in a Promise.
 * Adjust the options parameter as needed.
 */
const getHeartRateSamplesAsync = (options: object = {}): Promise<HealthSample[]> => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.getHeartRateSamples(options, (error: any, results: HealthSample[]) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

/**
 * Fetches health data (heart rate samples) from Apple HealthKit.
 */
export const fetchHealthData = async (): Promise<HealthData> => {
  try {
    const heartRates: HealthSample[] = await getHeartRateSamplesAsync({});
    return { heartRates };
  } catch (error) {
    console.error('Error fetching health data:', error);
    return { heartRates: [] };
  }
};

/**
 * Analyzes heart rate data using a TensorFlow model.
 * Loads the model from a URL, creates a tensor from the heart rate values,
 * runs the prediction, and returns the output as a Float32Array.
 */
export const analyzeHeartRate = async (): Promise<Float32Array> => {
  try {
    // Fetch heart rate samples.
    const heartRates: HealthSample[] = await getHeartRateSamplesAsync({});
    // Extract numeric values from the samples.
    const values = heartRates.map((sample) => sample.value);

    // Ensure the TensorFlow backend is ready.
    await tf.ready();

    // Load your pre-trained model (replace with your actual model URL).
    const model = await tf.loadLayersModel('https://your-model-url/model.json');

    // Create a 2D tensor from the values.
    // Adjust the shape as necessary for your model. Here, we assume shape [1, n].
    const inputTensor = tf.tensor2d([values]);

    // Run the prediction.
    const prediction = model.predict(inputTensor);
    let result: Float32Array;
    if (Array.isArray(prediction)) {
      // If the prediction returns an array of tensors, use the first one.
      result = prediction[0].dataSync() as Float32Array;
    } else {
      result = prediction.dataSync() as Float32Array;
    }
    return result;
  } catch (error) {
    console.error('Error analyzing heart rate:', error);
    return new Float32Array();
  }
};

/**
 * Analyzes overall health trends using a TensorFlow model.
 * Uses the heart rate samples from the provided HealthData,
 * passes them into the model, and then interprets the prediction to generate recommendations.
 * Falls back to simple rule-based logic if the model prediction fails.
 */
export const analyzeHealthTrends = async (data: HealthData): Promise<string[]> => {
  try {
    // Extract heart rate values.
    const values = data.heartRates.map((sample) => sample.value);

    // Ensure TensorFlow is ready.
    await tf.ready();

    // Load your pre-trained model (replace with your actual model URL).
    const model = await tf.loadLayersModel('https://your-model-url/model.json');

    // Create a tensor from the values (adjust shape as needed).
    const inputTensor = tf.tensor2d([values]);

    // Get the prediction from the model.
    const prediction = model.predict(inputTensor);
    let result: Float32Array;
    if (Array.isArray(prediction)) {
      result = prediction[0].dataSync() as Float32Array;
    } else {
      result = prediction.dataSync() as Float32Array;
    }

    // Compute an average prediction value.
    const avgPrediction =
      result.reduce((sum, val) => sum + val, 0) / result.length;

    // Generate recommendations based on the model's output.
    if (avgPrediction > 0.5) {
      return [
        'Your metrics indicate you are meeting your targets!',
        'Keep up the good work!'
      ];
    } else {
      return [
        'Consider increasing your daily activity.',
        'Try to eat a balanced diet.'
      ];
    }
  } catch (error) {
    console.error('Error analyzing health trends:', error);
    // Fallback rule-based logic.
    const recommendations: string[] = [];
    if (data.heartRates.length > 0) {
      const avgHeartRate =
        data.heartRates.reduce((sum, sample) => sum + sample.value, 0) /
        data.heartRates.length;
      if (avgHeartRate > 100) {
        recommendations.push('Your average heart rate is high. Consider consulting a doctor.');
      } else {
        recommendations.push('Your heart rate is within a normal range.');
      }
    }
    return recommendations;
  }
};
