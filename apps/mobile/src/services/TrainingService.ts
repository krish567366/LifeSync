import * as tf from '@tensorflow/tfjs';

// Train a simple model to predict user habits
export const trainHabitModel = async (data: number[][]) => {
  const model = tf.sequential({
    layers: [
      tf.layers.dense({ units: 10, activation: 'relu', inputShape: [3] }),
      tf.layers.dense({ units: 1, activation: 'sigmoid' }),
    ],
  });

  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });
  await model.fit(tf.tensor2d(data), tf.tensor1d([0, 1, 0, 1]), { epochs: 10 });
  return model;
};