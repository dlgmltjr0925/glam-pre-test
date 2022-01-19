import MainStackNavigator from './MainStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
