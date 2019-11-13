import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View, FlatList, TouchableHighlight} from 'react-native';
import {f, auth, firestore} from './config/config.js';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Access from './components/Access';
//New Things
import Content from './components/Content';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import VenuesScreen from './screens/VenuesScreen';
import GigsScreen from './screens/GigsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import JobList from './screens/JobListScreen';
import ProfileScreen from './screens/ProfileScreen';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userInfo: null,
      user: null
    }

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
      } catch (error) {
        console.log('error logging in', error);
      }
    } else {
      //If they are empty
      alert('Missing email or password');
    }
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

    const ArtistNavigator = createStackNavigator({
      Venues: {screen: props => <VenuesScreen {...props} screenProps={this.state.userInfo} />},
      Gigs: {screen: props => <GigsScreen {...props} screenProps={this.state.userInfo} />},
      Profile: {screen: props => <ProfileScreen {...props} screenProps={ this.state.userInfo} />},
    })

    const PhotographerNavigator = createStackNavigator({
      Notifications: {screen: props => <NotificationsScreen {...props} screenProps={this.state.userInfo} />},
      JobList: {screen: props => <JobListScreen  {...props} screenProps={this.state.userInfo} />},
      Profile: {screen: props => <ProfileScreen {...props} screenProps={ this.state.userInfo} />},
    })

    const AccessNavigator = createStackNavigator({
      Access: {screen: Access},
      SignUp: {screen: SignUp},
    })

    const ArtistContainer = createAppContainer(ArtistNavigator);
    const PhotographerContainer = createAppContainer(PhotographerNavigator);

    const AccessContainer = createAppContainer(AccessNavigator);

    return (
      <View style={styles.container}>
        {statusbar}

        {!this.state.loggedIn ?
          (
            <View style={styles.main}>

              <AccessContainer />

            </View>
          )
          :
          (
            <View>
              {this.state.loggedIn && this.state.userInfo !== null ?
                (
                  <View>
                    {this.state.userInfo.userType === "artist" ?
                      (
                        <View style={styles.main}>

                          <ArtistContainer />

                          <Text>{this.state.loggedIn && this.state.userInfo !== null ? this.state.userInfo.displayName + ' is currently logged in.' : 'Logging in..'}</Text>


                          <TouchableHighlight
                            onPress={() => {
                              this.signUserOut();
                            }}
                            style={{backgroundColor: 'black'}}>

                            <Text style={{color: '#fff'}}>
                              Log out.
                            </Text>

                          </TouchableHighlight>
                        </View>
                      )
                      :
                      (
                        <View style={styles.main}>

                          <PhotographerContainer />

                          <Text>{this.state.loggedIn && this.state.userInfo !== null ? this.state.userInfo.displayName + ' is currently logged in.' : 'Logging in..'}</Text>

                          <TouchableHighlight
                            onPress={() => {
                              this.signUserOut();
                            }}
                            style={{backgroundColor: 'black'}}>

                            <Text style={{color: '#fff'}}>
                              Log out.
                            </Text>

                          </TouchableHighlight>
                        </View>
                      )
                    }
                  </View>
                )
                :
                (
                  <View>
                    <Text>Logging in...</Text>
                  </View>
                )
              }
            </View>
          )
        }

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
  },
  main: {
    flex: 1,
    width: '100%'
  }
});

export default App;

// <Login
// textChangeEmail={email => this.setState({email})}
// textChangePassword={password => this.setState({password})}
// loginUser={this.loginUser} />
// <SignUp
//   userType={this.changeUserType}
//   userTypeValue={this.state.userType}
//   registerUser={this.registerUser}
// />
