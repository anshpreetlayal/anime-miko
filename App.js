import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="anime-miko"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#8B4513',
          },
          headerTintColor: '#FFFFFF', 
          headerTitleStyle: {
            fontWeight: 'bold', 
            fontFamily: 'Georgia', 
          },
        }}
      >
        <Stack.Screen
          name="anime-miko"
          component={IntroScreen}
          options={{
            headerTitle: 'anime-miko',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;