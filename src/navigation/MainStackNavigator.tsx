import EditProfileScreen from '../screens/edit-profile/EditProfileScreen';
import MainBottomTabNavigator from './MainBottomTabNavigator';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MainBottomTabNavigator.name}
        component={MainBottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EditProfileScreen.name}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
}
