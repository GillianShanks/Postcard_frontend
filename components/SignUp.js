import React from 'react';
import { Text, TextInput, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {f, auth, firestore} from '../config/config.js';
import RadioButtons from './RadioButtons.js';

//name, email, phone number, camera details, rating (starts 0)
export default class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      phoneNumber: '',
      userType: '',
      camera: ''
      //rating: 0
    }

    this.saveUserToFirestore = this.saveUserToFirestore.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.changeUserType = this.changeUserType.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  changeUserType(value){
    this.setState({userType: value});
  }

  saveUserToFirestore(userData, userId){
    const userObject = {
      displayName: userData.displayName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      user_id: userId,
      camera: userData.camera,
      userType: userData.userType
    }

    firestore.collection(userData.userType).doc(userId).set(userObject);
    console.log(userData, userId);

    this.setState({name: '',
    email: '',
    password: '',
    phoneNumber: '',
    userType: '',
    camera: '',
    rating: 0});

  }

  registerUser() {
    const email = this.state.email;
    const password = this.state.password;

    let userData = {
      displayName: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      userType: this.state.userType,
      camera: this.state.camera
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      const updateUser = auth.currentUser;
      updateUser.updateProfile({displayName: userData.displayName});
      this.saveUserToFirestore(userData, updateUser.uid);
    })
    .catch(error => console.log('error registering', error));
  }

  checkPassword(){
    console.log(this.state.password === this.state.passwordCheck);
    //return this.state.password === this.state.passwordCheck;
  }

  render(){
    const options = [
      {
        key: 'artist',
        text: 'an Artist',
      },
      {
        key: 'photographer',
        text: 'a Photographer',
      },
      {
        key: 'venue',
        text: 'a Venue',
      },
    ];

    return(
      <ScrollView style={styles.inputContainer}>

        <Text>Enter your details here:</Text>
        <Text>Name:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(name) => {
            this.setState({name})
          }}
          value={this.state.name}
          placeholder="Type your name here.." />
        {this.state.nameError && (<Text style={{color: "red"}}>{this.state.nameError}</Text>)}


        <Text>Email:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(emailInput) => {
            this.setState({email: emailInput});
          }}
          keyboardType={'email-address'}
          value={this.state.email} />

        <Text>Password:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(passwordInput) => {
            this.setState({password: passwordInput});
          }}
          secureTextEntry={true}
          value={this.state.password}/>

        <Text>Retype Password:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(passwordInput) => {
            this.setState({passwordCheck: passwordInput});
          }}
          secureTextEntry={true}
          value={this.state.passwordCheck}/>

        <Text>Phone number:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(phoneInput) => {
            this.setState({phoneNumber: phoneInput});
          }}
          keyboardType={'number-pad'}
          value={this.state.phoneNumber}/>

        <Text>I am </Text>

        <RadioButtons
          options={options}
          userType={this.changeUserType}/>

        {this.state.userType === 'photographer' ? (
          <ScrollView style={styles.inputContainer}>
            <Text> Which camera do you have?</Text>

            <TextInput
            styles={styles.input}
            onChangeText={(cameraInput) => {
              this.setState({camera: cameraInput})
            }}
            value={this.state.camera} />

          </ScrollView>
        ) : (
          <ScrollView></ScrollView>
        )}

        <TouchableHighlight
          onPress={() => {
            if (this.state.name.trim() === "") {
              this.setState({ nameError: 'Input required...'});
              console.log('from inside the sign up click','no name');
            } else {
              this.setState({nameError: null})
              this.registerUser();
            }

          }}
          style={{backgroundColor: 'black'}}>

        <Text
        style={{color: '#fff', width: 100}}>Sign Up</Text>
        </TouchableHighlight>

      </ScrollView>
    );
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
    flex: 1,
    fontSize: 14,
    height: 35,
    borderWidth: 1
  },
  addButton: {
    width: 100,
    backgroundColor: '#f542da',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#171717',
    fontSize: 18,
    fontWeight: '700'
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
