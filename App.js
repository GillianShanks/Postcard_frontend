import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//NEW
import {f, auth, firestore} from './config/config.js';
import AppNavigator from './navigation/AppNavigator';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userInfo: null,
      user: null,
      isLoadingComplete: false,
      word: ''
    }
    this.handleFinishLoading = this.handleFinishLoading.bind(this);
    this.changeUserType = this.changeUserType.bind(this);
    this.getWord = this.getWord.bind(this);
  }
  async loadResourcesAsync() {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  }
  handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  }
  handleFinishLoading() {
    this.setState({isLoadingComplete: true});
  }
  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified){
        this.setState({user, loggedIn: true});
        this.fetchUserInfo();
      } else if (user && user.emailVerified === false) {
        user.sendEmailVerification();
        this.setState({user, loggedIn: false});
        alert('Please check your email and verify your email address.')
      } else {
        this.setState({loggedIn: false, user: null, userInfo: null});
      }
    })
  }
  fetchUserInfo(){
    const currentUser = auth.currentUser;
    try {
      const userInfo = firestore.collection('artist').doc(currentUser.uid)
      .get()
      .then((doc1) => {
        if (doc1.exists) {
          this.setState({userInfo: doc1.data()})
          console.log('Docu data first if', doc1.data());
        } else {
          firestore.collection('venue').doc(currentUser.uid)
          .get()
          .then((doc2) => {
            if(doc2.exists) {
              this.setState({userInfo: doc2.data()})
              console.log('Docu data second if', doc2.data());
            }
            else {
              firestore.collection('photographer')
              .doc(currentUser.uid)
              .get()
              .then((doc3) => {
                if (doc3.exists) {
                  this.setState({userInfo: doc3.data()})
                  console.log('Docu data third if', doc3.data());
                }
              })
            }
          })
        }
      })
    } catch (error) {
      console.log('error fetching user info', error);
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
  changeUserType(value){
    this.setState({userType: value});
  }
  signUserOut() {
    auth.signOut()
    .then(() => {
      console.log('Logged out...');
    })
    .catch((error) => {
      console.log('Error:', error);
    })
  }

  getWord(word){
    this.setState({word: word})
  }

  render(){
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
        startAsync={this.loadResourcesAsync}
        onError={this.handleLoadingError}
        onFinish={() => this.handleFinishLoading()}
        />
      );
    } else {
      return (
        <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
