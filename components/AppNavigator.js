import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '..components/HomeScreen';
import DetailsScreen from '..components/DetailsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}

export default AppNavigator;

