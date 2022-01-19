import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

import { createTopTabNavigator } from '../components/navigation/top-tap-navigator';

const Tab = createTopTabNavigator();

function MockScreen(screenName: string) {
  return (): ReactElement => (
    <View>
      <Text>{screenName}</Text>
    </View>
  );
}

export default function HomeTopTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainScreen"
        component={MockScreen('MainScreen')}
        options={{ icon: require('../assets/icon/main/logo.png') }}
      />
      <Tab.Screen
        name="NearScreen"
        component={MockScreen('NearScreen')}
        options={{ title: '근처' }}
      />
      <Tab.Screen
        name="LiveScreen"
        component={MockScreen('LiveScreen')}
        options={{ title: '라이브' }}
      />
    </Tab.Navigator>
  );
}
