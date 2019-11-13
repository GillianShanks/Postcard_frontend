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
import JobListScreen from './screens/JobListScreen';
import ProfileScreen from './screens/ProfileScreen';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userInfo: null,
      user: null,
      venues: []
    }
    this.updateAppApp = this.updateAppApp.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified){
        this.setState({user, loggedIn: true});
        this.fetchUserInfo();
        this.fetchVenueInfo();
      } else if (user && user.emailVerified === false) {
        user.sendEmailVerification();
        this.setState({user, loggedIn: false});
        alert('Please check your email and verify your email address.')
      } else {
        this.setState({loggedIn: false, user: null, userInfo: null});
      }
    })
  }

  fetchVenueInfo(){
    let allVenues = [];

    try{
      firestore.collection('venue').get().then((doc) => {
        doc.forEach(doc => {
          allVenues.push(doc.data());
        })
        this.setState({
          venues: allVenues
        })
      })
    }
    catch(error){
      console.log('error from venue fetch', error);
    }
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


  updateAppApp(){
    this.setState(this.state);
  }

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;

    const ArtistNavigator = createStackNavigator({
      Venues: {screen: props => <VenuesScreen {...props} screenProps={[this.state.userInfo, this.state.venues]} />},
      Gigs: {screen: props => <GigsScreen {...props} screenProps={this.state.userInfo} />},
      Profile: {screen: props => <ProfileScreen {...props} screenProps={ [this.state.userInfo]} />},
    })

    const PhotographerNavigator = createStackNavigator({
      Notifications: {screen: props => <NotificationsScreen {...props} />},
      JobList: {screen: props => <JobListScreen  {...props} />},
      Profile: {screen: props => <ProfileScreen {...props} screenProps={ [this.state.userInfo]} />},
    })

    const AccessNavigator = createStackNavigator({
      Access: {screen: props => <Access {...props} screenProps={this.updateAppApp} />},
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
            <View style={styles.main}>
              {this.state.loggedIn && this.state.userInfo !== null ?
                (
                  <View style={styles.main}>
                    {this.state.userInfo.userType === "artist" ?
                      (
                        <View style={styles.main}>

                          <ArtistContainer />

                        </View>
                      )
                      :
                      (
                        <View style={styles.main}>

                          <PhotographerContainer />

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
