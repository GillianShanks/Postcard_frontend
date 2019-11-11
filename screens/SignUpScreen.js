import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';


class SignUpScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      word: ''
    }
    this._signUp = this._signUp.bind(this);

  }
  static navigationOptions = {
    title: 'Please register:',
  };



  render() {
    return (
      <View style={styles.container}>

      <Button onPress={this._signUp} title="Sign up!"/>
      </View>
    );
  }

  // <Text>Word:</Text>
  // <TextInput
  //   onChangeText={(text) => this.setState({word: text})}
  //   value={this.state.word} />

_signUp(){
    // this.props.getWord(this.state.word);
    this.props.navigation.navigate('Main');

}


  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('Main');
  // };
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: '#fff',
  }
});

export default SignUpScreen;
