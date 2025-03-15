import { GoogleHome, Alexa, Hue } from 'react-native-iot-bridge';

export const controlDevice = async (deviceType: string, action: string) => {
  switch(deviceType) {
    case 'google_home':
      return GoogleHome.execute(action);
    case 'alexa':
      return Alexa.sendCommand(action);
    case 'philips_hue':
      return Hue.changeLightState(action);
    default:
      throw new Error('Unsupported device');
  }
};