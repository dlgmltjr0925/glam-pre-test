import { Text, View } from 'react-native';

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MockScreen(props: any) {
  console.log(props);

  return (
    <View>
      <Text>MockScreen</Text>
    </View>
  );
}

export default function MainBottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={MockScreen} />
      <Tab.Screen name="LiveScreen" component={MockScreen} />
      <Tab.Screen name="StationScreen" component={MockScreen} />
      <Tab.Screen name="ConnectionScreen" component={MockScreen} />
      <Tab.Screen name="MoreScreen" component={MockScreen} />
    </Tab.Navigator>
  );
}
