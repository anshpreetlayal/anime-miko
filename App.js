import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';

const headerOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#8B4513',
  },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: 'Georgia',
  },
};

const introScreenOptions = {
  ...headerOptions,
  headerTitle: 'anime-miko',
  headerTitleAlign: 'center',
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="anime-miko" screenOptions={headerOptions}>
        <Stack.Screen name="anime-miko" component={IntroScreen} options={introScreenOptions} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

