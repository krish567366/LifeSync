import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Install with: npm install @expo/vector-icons

// Screens
import DashboardScreen from './src/screens/Dashboard';
import TasksScreen from './src/screens/TasksScreen';
import HealthScreen from './src/screens/HealthScreen';
import FinanceScreen from './src/screens/FinanceScreen';
import NewsScreen from './src/screens/News';
import TravelScreen from './src/screens/Travel';
import ARScreen from './src/screens/AR';
import SecurityScreen from './src/screens/Security';
import ContentScreen from './src/screens/Content';

// TypeScript types for navigation
type RootStackParamList = {
  Dashboard: undefined;
  Tasks: undefined;
  Health: undefined;
  Finance: undefined;
  News: undefined;
  Travel: undefined;
  AR: undefined;
  Security: undefined;
  Content: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'help'; // Fallback icon

            // Assign icons based on route name
            if (route.name === 'Dashboard') iconName = 'home';
            if (route.name === 'Tasks') iconName = 'list';
            if (route.name === 'Health') iconName = 'heart';
            if (route.name === 'Finance') iconName = 'cash';
            if (route.name === 'News') iconName = 'newspaper';
            if (route.name === 'Travel') iconName = 'airplane';
            if (route.name === 'AR') iconName = 'camera';
            if (route.name === 'Security') iconName = 'shield';
            if (route.name === 'Content') iconName = 'create';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00FF88', // Neon green for active tab
          tabBarInactiveTintColor: 'gray', // Gray for inactive tabs
          tabBarStyle: {
            backgroundColor: '#1A1A1A', // Dark background for tab bar
            borderTopWidth: 0, // Remove top border
          },
          headerStyle: {
            backgroundColor: '#000', // Dark background for header
          },
          headerTintColor: '#fff', // White text for header
        })}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{ title: 'LifeSync' }} // Custom title for Dashboard
        />
        <Tab.Screen name="Tasks" component={TasksScreen} />
        <Tab.Screen name="Health" component={HealthScreen} />
        <Tab.Screen name="Finance" component={FinanceScreen} />
        <Tab.Screen name="News" component={NewsScreen} />
        <Tab.Screen name="Travel" component={TravelScreen} />
        <Tab.Screen name="AR" component={ARScreen} />
        <Tab.Screen name="Security" component={SecurityScreen} />
        <Tab.Screen name="Content" component={ContentScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}