import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';

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

// Theme
const theme = {
  colors: {
    primary: '#00FF88',
    background: '#0A0A0A',
    card: '#1A1A1A',
    text: '#FFFFFF',
    border: '#2D2D2D',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  icons: {
    sm: 20,
    md: 24,
    lg: 28,
  },
};

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
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const iconConfig: Record<keyof RootStackParamList, keyof typeof Ionicons.glyphMap> = {
                Dashboard: 'home',
                Tasks: 'list',
                Health: 'heart',
                Finance: 'cash',
                News: 'newspaper',
                Travel: 'airplane',
                AR: 'camera',
                Security: 'shield',
                Content: 'create',
              };
              
              return (
                <Ionicons 
                  name={iconConfig[route.name]} 
                  size={theme.icons.md} 
                  color={color} 
                />
              );
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.text,
            tabBarStyle: {
              backgroundColor: theme.colors.card,
              borderTopWidth: 0,
              paddingBottom: theme.spacing.s,
              height: theme.spacing.xl * 2,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: theme.spacing.s,
            },
            headerStyle: {
              backgroundColor: theme.colors.background,
              shadowColor: 'transparent',
            },
            headerTitleStyle: {
              color: theme.colors.text,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          })}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{ title: 'LifeSync Dashboard' }}
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
    </ThemeProvider>
  );
}