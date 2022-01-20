import { Image, Pressable, Text, View } from 'react-native';
import React, { ReactElement, useCallback } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';

import EditProfileScreen from '../screens/edit-profile/EditProfileScreen';
import MainScreen from '../screens/main/MainScreen';
import { createTopTabNavigator } from '../components/navigation/top-tap-navigator';

const Tab = createTopTabNavigator();

function MockScreen(screenName: string) {
  return (): ReactElement => (
    <View>
      <Text>{screenName}</Text>
    </View>
  );
}

function TabBarRight() {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    navigation.dispatch(StackActions.push(EditProfileScreen.name));
  }, [navigation]);

  return (
    <Pressable onPress={handlePress}>
      <Image source={require('../assets/icon/main/setting.png')} />
    </Pressable>
  );
}

export default function HomeTopTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ TabBarRight }}>
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ icon: require('../assets/icon/main/logo.png') }}
      />
      <Tab.Screen
        name="NearScreen"
        component={MockScreen('NearByScreen')}
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
