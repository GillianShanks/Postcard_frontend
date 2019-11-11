import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GigsScreen from '../screens/GigsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VenuesScreen from '../screens/VenuesScreen';
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

//Venues Page
const VenuesStack = createStackNavigator(
  {
    Venues: VenuesScreen,
  },
  config
);

VenuesStack.navigationOptions = {
  tabBarLabel: 'Venues',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'} />
  ),
};

VenuesStack.path = '';

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
  VenuesStack,
  // SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
