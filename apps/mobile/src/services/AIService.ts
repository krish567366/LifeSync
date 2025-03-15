// src/services/AIService.ts

import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Import TensorFlow and initialize the React Native backend
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

/**
 * Fetches user data from Firestore.
 * Assumes a document structure where 'users/user123' contains an object with 'steps' and 'calories'.
 *
 * @returns A Promise resolving to an object with steps and calories or undefined if no data exists.
 */
export const fetchUserData = async (): Promise<{ steps: number; calories: number } | undefined> => {
  try {
    const userDocRef = doc(db, 'users', 'user123');
    const snapshot = await getDoc(userDocRef);
    if (snapshot.exists()) {
      return snapshot.data() as { steps: number; calories: number };
    }
    return undefined;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return undefined;
  }
};

/**
 * Analyzes user habits using a TensorFlow model.
 * The model is expected to accept a 2D tensor with shape [1, 2] (for steps and calories)
 * and return a numeric prediction. If the prediction is greater than 0.5, the model indicates
 * good habits; otherwise, it suggests room for improvement.
 * 
 * If model prediction fails or is unavailable, the function falls back to rule-based analysis.
 *
 * @param data - An object containing the user's steps and calories.
 * @returns A Promise resolving to an array of recommendation strings.
 */
export const analyzeHabits = async (data: { steps: number; calories: number }): Promise<string[]> => {
  try {
    // Ensure the TensorFlow backend is ready
    await tf.ready();

    // Replace with your actual model URL (must point to a valid model.json)
    const modelUrl = 'https://your-model-url/model.json';
    const model = await tf.loadLayersModel(modelUrl);

    // Create a 2D tensor from the input data: shape [1, 2]
    const inputTensor = tf.tensor2d([[data.steps, data.calories]]);
    
    // Run prediction
    const prediction = model.predict(inputTensor);
    let predValue: number;
    if (Array.isArray(prediction)) {
      predValue = (prediction[0] as tf.Tensor).dataSync()[0];
    } else {
      predValue = (prediction as tf.Tensor).dataSync()[0];
    }

    // Generate recommendations based on the prediction value
    if (predValue > 0.5) {
      return ['The model indicates you are meeting your targets!'];
    } else {
      return ['The model suggests room for improvement in your daily routine.'];
    }
  } catch (error) {
    console.error('Error with TensorFlow model prediction, using fallback logic:', error);

    // Fallback rule-based logic if TensorFlow model prediction fails
    const recommendations: string[] = [];
    if (data.steps >= 10000) {
      recommendations.push('Great job meeting your step goal!');
    } else {
      recommendations.push('Try to increase your daily steps to 10,000.');
    }
    if (data.calories > 2500) {
      recommendations.push('Your calorie intake is high. Consider adjusting your diet.');
    } else {
      recommendations.push('Your calorie intake looks good.');
    }
    return recommendations;
  }
};

/**
 * Suggests tasks for a given user.
 * This dummy implementation returns a fixed set of suggested tasks after a short delay.
 * Replace this logic with your actual task suggestion algorithm or API call.
 *
 * @param userId - The ID of the user for whom to suggest tasks.
 * @returns A Promise resolving to an array of task descriptions.
 */
export const suggestTasks = async (userId: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        'Review your emails',
        'Plan your day',
        'Take a short walk',
        'Check your calendar'
      ]);
    }, 400);
  });
};
