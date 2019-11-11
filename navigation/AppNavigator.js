import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LogInNavigator from './LogInNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

//this is AppContainer
export default createAppContainer(
  createSwitchNavigator(
    {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Login: LogInNavigator,
    Main: MainTabNavigator,
    },
    {
    initialRouteName: 'AuthLoading',
    },
  )
);
