import { Text, View } from 'react-native';

import MainBottomTabNavigator from './MainBottomTabNavigator';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function MockScreen() {
  return (
    <View>
      <Text>MockScreen</Text>
    </View>
  );
}

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainBottomTabNavigator"
        component={MainBottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SecondLevelNavigator" component={MockScreen} />
    </Stack.Navigator>
  );
}
