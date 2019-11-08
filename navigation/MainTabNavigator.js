import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GigsScreen from '../screens/GigsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MediaScreen from '../screens/MediaScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

//Home Page
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

//Profile Page
const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ProfileStack.path = '';

//Gigs List Page
const GigsStack = createStackNavigator(
  {
    Gigs: GigsScreen,
  },
  config
);

GigsStack.navigationOptions = {
  tabBarLabel: 'Gigs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'} />
  ),
};

GigsStack.path = '';

//Media Page
const MediaStack = createStackNavigator(
  {
    Media: MediaScreen,
  },
  config
);

MediaStack.navigationOptions = {
  tabBarLabel: 'Media',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-photos' : 'md-photos'} />
  ),
};

MediaStack.path = '';

//Settings Page
// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen,
//   },
//   config
// );
//
// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//   ),
// };
//
// SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ProfileStack,
  GigsStack,
  MediaStack,
  // SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
