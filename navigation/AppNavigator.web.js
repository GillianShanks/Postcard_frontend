import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LogInNavigator from './LogInNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const switchNavigator = createSwitchNavigator(
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
);
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
