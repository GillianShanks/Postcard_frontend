import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';


class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Please register:',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this._signInAsync} title="Sign up!"/>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: '#fff',
  }
});

export default SignUpScreen;
