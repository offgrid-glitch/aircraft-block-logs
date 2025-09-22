import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '@/screens/HomeScreen';
import BlockInCameraScreen from '@/screens/BlockInCameraScreen';
import FormScreen from '@/screens/FormScreen';
import BlockOutCameraScreen from '@/screens/BlockOutCameraScreen';
import ReviewShareScreen from '@/screens/ReviewShareScreen';
import LogsListScreen from '@/screens/LogsListScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import HelpScreen from '@/screens/HelpScreen';

// Navigation parameter types
export type RootStackParamList = {
  Main: undefined;
  BlockInCamera: { jobId?: string };
  Form: { jobId: string };
  BlockOutCamera: { jobId: string };
  ReviewShare: { jobId: string };
  Help: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Logs: undefined;
  Settings: undefined;
};

// Create navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Main tab navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Logs') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Logs" 
        component={LogsListScreen}
        options={{ title: 'Logs' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

// Main app navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="BlockInCamera" 
        component={BlockInCameraScreen}
        options={{ 
          title: 'Block In - Capture Photo',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="Form" 
        component={FormScreen}
        options={{ 
          title: 'Flight Details',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="BlockOutCamera" 
        component={BlockOutCameraScreen}
        options={{ 
          title: 'Block Out - Capture Photo',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="ReviewShare" 
        component={ReviewShareScreen}
        options={{ 
          title: 'Review & Share',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="Help" 
        component={HelpScreen}
        options={{ 
          title: 'Help & Support',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}