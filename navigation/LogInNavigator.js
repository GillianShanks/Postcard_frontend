import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SignUpScreen from '../screens/SignUpScreen';
import TabBarIcon from '../components/TabBarIcon';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const LogInStack = createStackNavigator(
  {
    SignUp: SignUpScreen,
  },
  config,
  // {
  //   navigationOptions: {
  //     tabBarLabel: 'Sign Up',
  //     tabBarIcon: ({ focused }) => (
  //       <TabBarIcon
  //         focused={focused}
  //         name={
  //           Platform.OS === 'ios'
  //           ? `ios-information-circle${focused ? '' : '-outline'}`
  //           : 'md-information-circle'
  //         }
  //       />
  //     ),
  //   }
  // },
  // {path: ''}
);

const loginTabNavigator = createBottomTabNavigator({
  LogInStack,
});

loginTabNavigator.path = '';

export default loginTabNavigator;
