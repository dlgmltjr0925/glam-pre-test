import { Image, ImageSourcePropType, Text, View } from 'react-native';

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
        name="HomeScreen"
        component={MockScreen}
        options={{
          tabBarIcon: TabBarIcon(require('../assets/icon/nav/home.png')),
        }}
      />
      <Tab.Screen
        name="LiveScreen"
        component={MockScreen}
        options={{
          tabBarIcon: TabBarIcon(require('../assets/icon/nav/live.png')),
        }}
      />
      <Tab.Screen
        name="StationScreen"
        component={MockScreen}
        options={{
          tabBarIcon: TabBarIcon(require('../assets/icon/nav/station.png')),
        }}
      />
      <Tab.Screen
        name="ConnectionScreen"
        component={MockScreen}
        options={{
          tabBarIcon: TabBarIcon(require('../assets/icon/nav/connection.png')),
        }}
      />
      <Tab.Screen
        name="MoreScreen"
        component={MockScreen}
        options={{
          tabBarIcon: TabBarIcon(require('../assets/icon/nav/more.png')),
        }}
      />
    </Tab.Navigator>
  );
}
