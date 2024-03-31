import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import WatchlistScreen from './components/Watchlist';
import AnimeDetailsScreen from './components/AnimeDetails';
import SearchScreen from './components/Search';

const Stack = createStackNavigator();

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
      <Stack.Navigator initialRouteName="IntroScreen" screenOptions={headerOptions}>
        <Stack.Screen name="IntroScreen" component={IntroScreen} options={introScreenOptions} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="WatchlistScreen" component={WatchlistScreen} />
        <Stack.Screen name="AnimeDetailsScreen" component={AnimeDetailsScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
