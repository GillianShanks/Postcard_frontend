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
    this.props.updateAppApp(true);
  }

  render() {
    if (!this.props) {
      return 'Loading ...'
    }
    return (
      <View style={styles.inputContainer}>

        <Text style={styles.basicText}>Email: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email} />


        <Text style={styles.basicText}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry={true}
          value={this.state.password} />      

          <View>
          <TouchableHighlight
            onPress={() => this.login()}
            >

          <Text
            style={styles.loginButton}>
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
    padding: 10,
  },
  inputContainer: {
   flexDirection: 'column',
   shadowOffset: {width: 0, height: 3},
   shadowColor: '#171717',
   shadowOpacity: 0.1,
   width: '100%',
   padding: 50,
 },
 input: {
   backgroundColor: 'lavender',
   fontSize: 14,
   height: 35,
   borderWidth: 1,
   paddingLeft: 5,
 },
 basicText: {
   color: '#e8effa',
   padding: 10,
 },
 loginButton: {
   color: '#000',
   textAlign: 'center',
   borderRadius: 4,
   borderWidth: 1,
   borderColor: 'orange',
   padding: 5,
   width: '100%',
   backgroundColor: 'orange',
   marginTop: 35,
 }
});
