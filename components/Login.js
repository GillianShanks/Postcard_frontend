import React from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {f, auth, firestore} from '../config/config.js';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
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

        <Button
          title="Login"
          onPress={() => this.props.loginUser(this.state.email, this.state.password)} />

      </View>
    )
  }
}

//CSS section
const styles = StyleSheet.create({
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
