import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableHighlight, ScrollView} from 'react-native';
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
      phoneNumber: '',
      userType: '',
      camera: '',
      rating: 0
    }

    this.saveUserToFirestore = this.saveUserToFirestore.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  componentDidUpdate() {
  // only update chart if the data has changed
  if (this.state.userType !== this.props.userTypeValue) {
    this.setState({userType: this.props.userTypeValue})
  }
}

  saveUserToFirestore(userData, userId){
    const userObject = {
      displayName: userData.displayName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      user_id: userId,
      camera: userData.camera
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
        <Text>Name:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(name) => {
            this.setState({name})
          }}
          value={this.state.name}/>

        <Text>Email:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(emailInput) => {
            this.setState({email: emailInput});
          }}
          keyboardType={'email-address'}
          value={this.state.email}/>

        <Text>Password:</Text>

        <TextInput
          style={styles.input}
          onChangeText={(passwordInput) => {
            this.setState({password: passwordInput});
          }}
          secureTextEntry={true}
          value={this.state.password}/>

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
          userType={this.props.userType}/>

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
          <View></View>
        )}


        <TouchableHighlight
          onPress={() => {
            // this.saveUserToFirestore();
            this.registerUser();
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
    fontSize: 18,
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
  }
});
