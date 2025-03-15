import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { controlDevice } from '../services/IOTService';

export default function IoTScreen() {
  const [status, setStatus] = useState<string>('Off');

  const toggleLight = async () => {
    await controlDevice('philips_hue', 'toggle');
    setStatus(prev => (prev === 'Off' ? 'On' : 'Off'));
  };

  return (
    <View>
      <Text>Light Status: {status}</Text>
      <Button title="Toggle Light" onPress={toggleLight} />
    </View>
  );
}