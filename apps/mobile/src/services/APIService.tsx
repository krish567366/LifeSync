import React from 'react';
import TaskCard from '../components/TaskCard';
import { View, Text, StyleSheet } from 'react-native';

interface Task {
  id: string;
  title: string;
  description?: string;
}

export const processTask = ({ task }: { task: Task }): void => {
  console.log(task.title);
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