import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { VictoryLine } from 'victory';
import { fetchHealthData, analyzeHealthTrends } from '../services/HealthService';

export default function HealthScreen() {
  const [heartRates, setHeartRates] = useState<number[]>([]);
  const [healthTips, setHealthTips] = useState<string[]>([]);

  useEffect(() => {
    fetchHealthData().then(data => {
      // Map the array of HealthSample objects to an array of numbers.
      // Adjust "sample.value" if your HealthSample property is named differently.
      setHeartRates(data.heartRates.map(sample => sample.value));
      analyzeHealthTrends(data).then(setHealthTips);
    });
  }, []);

  return (
    <View>
      <VictoryLine
        data={heartRates.map((rate, index) => ({ x: index, y: rate }))}
      />
      {healthTips.map((tip, index) => (
        <Text key={index}>{tip}</Text>
      ))}
    </View>
  );
}
