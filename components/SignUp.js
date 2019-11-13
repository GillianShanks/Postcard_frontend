import React from 'react';
import { Text, TextInput, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {f, auth, firestore} from '../config/config.js';
import RadioButtons from './RadioButtons.js';

//name, email, phone number, camera details, rating (starts 0)
export default class SignUp extends React.Component {

  static navigationOptions = {
    title: 'Postcard - Sign Up',
  };

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
    this.validate = this.validate.bind(this);
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

  validate(){
    
    if (this.state.name.trim() === '') {
      this.setState({ nameError: 'Name required..'});
    } else if (this.state.email.trim() === '') {
      this.setState({ emailError: 'Email required..'});
    } else if (this.state.password.trim() === '') {
      this.setState({ passwordError: 'Password required..'});
    } else if (this.state.passwordCheck.trim() === '' || this.state.passwordCheck.trim() !== this.state.password.trim()) {
      this.setState({ passwordCheckError: "Passwords don't match!"});
    } else if (this.state.phoneNumber.trim() === '') {
      this.setState({ phoneNumberError: 'Email required..'});
    } else if (this.state.userType.trim() === '') {
      this.setState({ userType: 'Are you a musician or a shooter?'});
    } else if (this.state.userType === 'photographer' && this.state.camera.trim() === '') {
      this.setState({ userType: 'Camera details required..'});
    }
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

    const validations = this.state.name.trim() === "" || this.state.email.trim() === "" || this.state.password.trim() === "" || this.state.passwordCheck.trim() === "" || this.state.phoneNumber.trim() === "" || this.state.userType.trim() === "";

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
        {!this.state.name && (<Text style={{color: "red"}}>{this.state.nameError}</Text>)}


        <Text>Email:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(emailInput) => {
            this.setState({email: emailInput});
          }}
          keyboardType={'email-address'}
          value={this.state.email} />

        {!this.state.email && (<Text style={{color: "red"}}>{this.state.emailError}</Text>)}

        <Text>Password:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(passwordInput) => {
            this.setState({password: passwordInput});
          }}
          secureTextEntry={true}
          value={this.state.password}/>

          {!this.state.password && (<Text style={{color: "red"}}>{this.state.passwordError}</Text>)}

        <Text>Retype Password:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(passwordInput) => {
            this.setState({passwordCheck: passwordInput});
          }}
          secureTextEntry={true}
          value={this.state.passwordCheck}/>
          {this.state.passwordCheckError && (<Text style={{color: "red"}}>{this.state.passwordCheckError}</Text>)}

        {!this.state.passwordCheck && (<Text style={{color: "red"}}>{this.state.passwordCheckError}</Text>)}

        <Text>Phone number:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(phoneInput) => {
            this.setState({phoneNumber: phoneInput});
          }}
          keyboardType={'number-pad'}
          value={this.state.phoneNumber}/>

          {!this.state.phoneNumber && (<Text style={{color: "red"}}>{this.state.phoneNumberError}</Text>)}

        <Text>I am </Text>

        <RadioButtons
          options={options}
          userType={this.changeUserType}/>

        {this.state.userType === 'photographer' ? (
          <ScrollView style={styles.inputContainer}>
            <Text> Which camera do you have?</Text>

            <TextInput
            style={styles.input}
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
            if (validations) {
              this.validate();
              //this.setState({ nameError: 'Input required...'});
            } else {
              this.setState({nameError: null})
              this.registerUser();
            }

          }}
          style={{backgroundColor: 'black'}}>

        <Text
        style={{color: '#fff'}}>Sign Up</Text>
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
  }
});
