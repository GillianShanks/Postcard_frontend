// Will show log in and sign up buttons.
import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, TouchableHighlight } from 'react-native';
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
    const {navigate} = this.props.navigation;

    return (
      <View>

      <Login
        textChangeEmail={email => this.setState({email})}
        textChangePassword={password => this.setState({password})}
        loginUser={this.loginUser} />
        <View style={styles.button}>
        <TouchableHighlight
          onPress={() => navigate('SignUp')}
          style={{backgroundColor: 'orange', width: '25%'}}>

        <Text
          style={{color: '#fff', textAlign: 'center'}}>
          SIGN UP
        </Text>

        </TouchableHighlight>
        </View>

      </View>
    )};
}

//CSS section
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default Access;
