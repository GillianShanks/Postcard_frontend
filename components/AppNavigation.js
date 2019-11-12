import { createStackNavigator } from 'react-navigation';
import Content from './Content';

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    initialRouteName: 'Home'
  }
)

export default AppNavigation
