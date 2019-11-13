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
    .catch(error =>  {if (error.code === "auth/invalid-email") {
      this.setState({emailError: "Please enter a valid email"});
    } else if (error.code === "auth/email-already-in-use") {
      this.setState({emailError: "The email is already in our system!"});
    } else if (error.code === "auth/weak-password") {
      this.setState({passwordError: "Password needs to have 6 characters"})
    }
    console.log(error);});
  }

//React Native doesn't have a proper Form that can check all inputs at the same time
//This is why it checks every textinput separately. So if you were to leave Name and email empty, it will only show the very first error it finds i.e. Name required;
  validate(){

    switch ('') {
      case this.state.name.trim():
        this.setState({ nameError: 'Name required..'});
        break;
      case this.state.email.trim():
        this.setState({ emailError: 'Email required..'});
        break;
      case this.state.password.trim():
        this.setState({ passwordError: 'Password required..'});
        break;
      case this.state.passwordCheck.trim():
        this.setState({ passwordCheckError: 'Please re-enter password'});
        break;
      case this.state.phoneNumber.trim():
        this.setState({ phoneNumberError: 'Phone number required..'});
        break;
      case this.state.userType.trim():
        this.setState({ userTypeError: 'Please select a user..'});
        break;
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

    const validations = this.state.name.trim() === "" || this.state.email.trim() === "" || this.state.password.trim() === "" || this.state.passwordCheck.trim() === "" || this.state.phoneNumber.trim() === "" || this.state.userType.trim() === "" || (this.state.password !== this.state.passwordCheck);

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
        {this.state.emailError && (<Text style={{color: "red"}}>{this.state.emailError}</Text>)}

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

        {!this.state.passwordCheck && (<Text style={{color: "red"}}>{this.state.passwordCheckError}</Text>)}

        {this.state.passwordCheck.length >= 1 && this.state.password !== this.state.passwordCheck ? (<Text style={{color: "red"}}>Passwords don't match</Text>) : (<Text></Text>)}



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

        {!this.state.userType && (<Text style={{color: "red"}}>{this.state.userTypeError}</Text>)}

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
            } else {
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
