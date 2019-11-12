import React from 'react';
import {
  Platform,
  Text,
  View
 } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SignUpScreen from '../screens/SignUpScreen';
import TabBarIcon from '../components/TabBarIcon';
import LogInScreen from '../screens/LogInScreen';


// const logInNavigator = (props) => {
//   if (!props){
//     return <View><Text>Loading...</Text></View>
//   }

  const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
  });

  const SignUpStack = createStackNavigator(
    {
      SignUp: {screen: SignUpScreen},
    },
    config,
  );

  SignUpStack.navigationOptions = {
    tabBarLabel: 'SignUp',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
    ),
  };

  SignUpStack.path = '';


  const LogInStack = createStackNavigator(
    {
      LogIn: LogInScreen,
    },
    config
  )

  LogInStack.navigationOptions = {
    tabBarLabel: 'Log In',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
    ),
  };

  LogInStack.path = '';

  const loginTabNavigator = createBottomTabNavigator({
    SignUpStack,
    LogInStack,
  });

  loginTabNavigator.path = '';

// }


export default loginTabNavigator;
