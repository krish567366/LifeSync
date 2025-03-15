// src/components/TaskCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface Task {
  id: string;
  title: string;
  description?: string;
}

/**
 * A helper function to process a task.
 */
export const processTask = ({ task }: { task: Task }): void => {
  console.log(task.title);
};

/**
 * A component to display a Task.
 */
const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      {task.description && <Text style={styles.description}>{task.description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    color: '#00FF88',
    fontSize: 16,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default TaskCard;
