import { VoiceProcessor } from 'react-native-voice';
import { TensorFlow } from '@tensorflow/tfjs-react-native';

export const initVoiceEngine = async () => {
  await VoiceProcessor.init('vosk-model-small-en');
  VoiceProcessor.onResults = async (result) => {
    const intent = await classifyIntent(result.text);
    executeCommand(intent);
  };
};

const classifyIntent = async (text: string) => {
  const model = await tf.loadLayersModel('assets/models/intent_classifier.json');
  const prediction = model.predict(tf.tensor([text]));
  return prediction.argMax(1).dataSync()[0];
};