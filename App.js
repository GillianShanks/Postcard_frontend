import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View, FlatList, TouchableHighlight } from 'react-native';
import {f, auth, firestore} from './config/config.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userInfo: null,
      user: null
      // email: '',
      // password: '',
      // userType: ''
    }
    this.registerUser = this.registerUser.bind(this);
    this.changeUserType = this.changeUserType.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
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
        //user.sendEmailVerification();
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


  registerUser() {
    const email = this.state.email;
    const password = this.state.password;
    console.log(email, password);

    auth.createUserWithEmailAndPassword(email, password)
    .then((userObj) => console.log(email, password, userObj))
    .catch(error => console.log('error registering', error));
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


  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;

    return (
      <View style={styles.container}>
      {statusbar}

      {!this.state.loggedIn ? (
      <View>
      <Login
      textChangeEmail={email => this.setState({email})}
      textChangePassword={password => this.setState({password})}
      loginUser={this.loginUser} />

      <SignUp
        textChangeEmail={email => this.setState({email})}
        textChangePassword={password => this.setState({password})}
        userType={this.changeUserType}
        userTypeValue={this.state.userType}
        registerUser={this.registerUser}
      />
      </View>
    ) : (
      <View>
      <Text> {this.state.loggedIn && this.state.userInfo !== null ? this.state.userInfo.displayName + ' is' : 'You are'} currently logged in.</Text>
        <TouchableHighlight
          onPress={() => {
            this.signUserOut();
          }}
          style={{backgroundColor: 'black'}}>

        <Text
          style={{color: '#fff'}}>Sign the fuck out.
        </Text>

        </TouchableHighlight>
      </View>

    )}



      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusbar: {
    backgroundColor: '#f542da',
    height: 20,
  }
});
