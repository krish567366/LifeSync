import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { suggestTasks } from '../services/AIService';

const TasksScreen = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    suggestTasks('user123').then(setTasks);
  }, []);

  return (
    <View>
      {tasks.map((task, index) => (
        <Text key={index}>{task}</Text>
      ))}
    </View>
  );
};

export default TasksScreen;
