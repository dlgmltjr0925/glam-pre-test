import { Image, ImageSourcePropType, Text } from 'react-native';

import HomeTopTabNavigator from './HomeTopTabNavigator';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MockScreen(screenName: string) {
  return () => (
    <SafeAreaView>
      <Text>{screenName}</Text>
    </SafeAreaView>
  );
}

function TabBarIcon(source: ImageSourcePropType) {
  return () => <Image source={source} />;
}

export default function MainBottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIconStyle: { width: 28, height: 28 },
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTopTabNavigator"
        component={HomeTopTabNavigator}
        options={{
          tabBarIcon: TabBarIcon(require('../assets/icon/nav/home.png')),
        }}
      />
      <Tab.Screen
        name="LiveScreen"
        component={MockScreen('LiveScreen')}
        options={{
          tabBarIcon: TabBarIcon(require('../assets/icon/nav/live.png')),
        }}
      />
      <Tab.Screen
        name="StationScreen"
        component={MockScreen('StationScreen')}
        options={{
          tabBarIcon: TabBarIcon(require('../assets/icon/nav/station.png')),
        }}
      />
      <Tab.Screen
        name="ConnectionScreen"
        component={MockScreen('ConnectionScreen')}
        options={{
          tabBarIcon: TabBarIcon(require('../assets/icon/nav/connection.png')),
        }}
      />
      <Tab.Screen
        name="MoreScreen"
        component={MockScreen('MoreScreen')}
        options={{
          tabBarIcon: TabBarIcon(require('../assets/icon/nav/more.png')),
        }}
      />
    </Tab.Navigator>
  );
}
