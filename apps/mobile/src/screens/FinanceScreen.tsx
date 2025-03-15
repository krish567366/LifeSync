import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { VictoryPie } from 'victory';
import { Text } from 'react-native';
import { fetchSpending, createBudget } from '../services/FinanceService';

export default function FinanceScreen() {
  const [spending, setSpending] = useState<Record<string, number>>({});
  const [budget, setBudget] = useState<number>(0);

  useEffect(() => {
    fetchSpending().then(setSpending);
    createBudget().then(setBudget);
  }, []);

  return (
    <View>
      <VictoryPie
        data={Object.entries(spending).map(([category, amount]) => ({
          x: category,
          y: amount,
        }))}
      />
      <Text>Monthly Budget: ${budget}</Text>
    </View>
  );
}