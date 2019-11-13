import React from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
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
  }

  render() {
    return (
      <View>
        <Text>Log in to Postcard</Text>

        <Text>Email:</Text>
        <TextInput
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email} />

        <Text>Password:</Text>
        <TextInput
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry={true}
          value={this.state.password} />

        <Button
          title="Login"
          onPress={() => this.props.loginUser(this.state.email, this.state.password)}
          style={{backgroundColor: 'red'}} />

      </View>
    )
  }
}

//CSS section
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
