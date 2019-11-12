import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import SignUp from './SignUp';

const AuthNavigation = createStackNavigator(
  {
    Login: {screen: Login},
    Signup: {screen: SignUp}
  },
  {
    initialRouteName: 'Login'
  }
)

export default AuthNavigation;
