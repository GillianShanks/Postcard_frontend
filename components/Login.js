import React from 'react';
import {View, Text, TextInput, StyleSheet, Button, TouchableHighlight} from 'react-native';
import {f, auth, firestore} from '../config/config.js';

export default class Login extends React.Component {

  static navigationOptions = {
    title: 'Postcard - Log In',
  };

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.login = this.login.bind(this);
  }

  login(){
    this.props.loginUser(this.state.email, this.state.password);
    this.props.updateApp();
    this.props.updateAppApp();
  }

  render() {
    if (!this.props) {
      return 'Loading ...'
    }
    return (
      <View style={styles.inputContainer}>
        <Text>Log in to Postcard</Text>

        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email} />

        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry={true}
          value={this.state.password} />
          <View style={styles.button}>
          <TouchableHighlight
            onPress={() => this.login()}
            style={{backgroundColor: 'orange', width: '25%'}}>

          <Text
            style={{color: '#fff', textAlign: 'center'}}>
            LOG IN
          </Text>

          </TouchableHighlight>
          </View>

      </View>
    )
  }
}

//CSS section
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
   flexDirection: 'column',
   shadowOffset: {width: 0, height: 3},
   shadowColor: '#171717',
   shadowOpacity: 0.1
 },
 input: {
   backgroundColor: 'lavender',
   fontSize: 14,
   height: 35,
   borderWidth: 1
 }
});
