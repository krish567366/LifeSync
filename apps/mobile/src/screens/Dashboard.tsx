import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { VictoryBar, VictoryPie } from '../components/VictoryWrapper';
import { fetchUserData, analyzeHabits } from '../services/AIService';
import { SecureStorageUtil } from '../utils/encryption';
import DashboardCard from '../components/DashboardCard';

export default function DashboardScreen() {
  const [healthData, setHealthData] = useState({ steps: 0, calories: 0 });
  const [financeData, setFinanceData] = useState({ income: 0, expenses: 0 });

  useEffect(() => {
    // Fetch encrypted user data
    SecureStorageUtil.get('userMetrics').then((data: string | null) => {
      if (data) {
        const metrics = JSON.parse(data);
      setHealthData(metrics.health);
      setFinanceData(metrics.finance);
      
      // AI habit prediction
      analyzeHabits(metrics).then(prediction => {
        console.log('AI Recommendation:', prediction);
      });
      }
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#000', padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>LifeSync Dashboard</Text>
      
      <DashboardCard title="Health Metrics">
        <VictoryPie
          data={[
            { x: 'Steps', y: healthData.steps },
            { x: 'Calories', y: healthData.calories },
          ]}
          colorScale={['#00FF88', '#00CCFF']}
        />
      </DashboardCard>

      <DashboardCard title="Financial Health">
        <VictoryBar
          data={[
            { x: 'Income', y: financeData.income },
            { x: 'Expenses', y: financeData.expenses },
          ]}
          style={{ data: { fill: '#00FF88' } }}
        />
      </DashboardCard>
    </ScrollView>
  );
}