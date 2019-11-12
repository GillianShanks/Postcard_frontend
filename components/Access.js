// Will show log in and sign up buttons.
import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import Login from './Login';
import {f, auth, firestore} from '../config/config.js';

class Access extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  loginUser = async(email, password) => {
    if (email !== '' && password !== '') {
      //
      try {
        let user = await auth.signInWithEmailAndPassword(email, password)
      } catch (error) {
        console.log('error logging in', error);
      }
    } else {
      //If they are empty
      alert('Missing email or password');
    }
  }

  render() {
    return (
      <View>

      <Login
        textChangeEmail={email => this.setState({email})}
        textChangePassword={password => this.setState({password})}
        loginUser={this.loginUser} />

      <Button
        title="Sign Up"
        onPress={() => {
          this.props.navigation.navigate('SignUp');
        }}/>

      </View>
    )};
}

export default Access;
