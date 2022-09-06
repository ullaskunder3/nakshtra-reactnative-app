import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import AsteroidInfo from './screens/AstreriodInfo';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name="Home"
        component={Home} options={{ title: 'Nakshtra' }}/>
      <Stack.Screen name="AsteroidInfo" component={AsteroidInfo} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;