import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardCard = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    color: '#00FF88',
    fontSize: 18,
    marginBottom: 12,
  },
  content: {
    minHeight: 200,
  },
});

export default DashboardCard;