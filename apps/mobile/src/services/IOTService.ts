import { GoogleHome, Alexa, Hue } from 'react-native-iot-bridge';
import express from 'express';

const app = express();
app.use(express.json());

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

// Unified API Endpoint
import { Request, Response } from 'express';

app.post('/control-device', async (req: Request, res: Response) => {
  await controlDevice(req.body.device, req.body.action);
  res.status(200).send('OK');
});