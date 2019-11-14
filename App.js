import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View, FlatList, TouchableHighlight, Header, Image} from 'react-native';
import {f, auth, firestore} from './config/config.js';
import SignUp from './components/SignUp';
import Access from './components/Access';
//New Things
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2

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
        this.setState({loggedIn: false, user: null, userInfo: null, venues: []});
        alert('Please check your email and verify your email address.')
      } else {
        this.setState({loggedIn: false, user: null, userInfo: null, venues: []});
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

  updateAppApp(value){
    //this.setState(this.state);
    const user = auth.currentUser
    if (user) {
      if (value) {
        this.setState({loggedIn: value, user: user})
        this.fetchUserInfo();
        this.fetchVenueInfo();
      }} else {
        this.setState({loggedIn: false, user: null, userInfo: null, venues: []});
      }
    }

    render() {
      const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;

      //sets up the specific tab icon for each screen in the bottom tab bar
      const getTabBarIcon = (navigation, focused, tintColor) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Venue') {
          iconName = `ios-business`;
        } else if (routeName === 'Gigs') {
          iconName = `ios-musical-notes`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person`;
        } else if (routeName === 'Job List') {
          iconName = `ios-list`;
        } else if (routeName === 'Notifications') {
          iconName = `ios-reverse-camera`;
        } else if (routeName === 'Log In') {
          iconName = `ios-log-in`;
        } else if (routeName === 'Sign Up') {
          iconName = `ios-person-add`;
        }
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      };

      // These are all of the screen stacks
      const config = {
        defaultNavigationOptions: {
          headerRight: (
            <Text style={{color:'white', fontSize: 20}}>
            <Image source={require('./assets/PostcardLogo.png')} style={{ width: 100, height: 50 }} />
            Postcard
            </Text>
          ),
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'orange',
        }
      }

      const VenuesStack = createStackNavigator(
        {
          Venues: {screen: props => <VenuesScreen {...props} screenProps={[this.state.userInfo, this.state.venues]} />},
        },
        config
      )
      VenuesStack.path = '';

      const GigsStack= createStackNavigator(
        {
          Gigs: {screen: props => <GigsScreen {...props} screenProps={this.state.userInfo} />},
        }, config
      )
      GigsStack.path = '';

      const ProfileStack = createStackNavigator(
        {
          Profile: {screen: props => <ProfileScreen {...props} screenProps={ [this.state.userInfo]} />},
        }, config
      )
      ProfileStack.path = '';

      const NotificationsStack = createStackNavigator(
        {
          Notifications: {screen: props => <NotificationsScreen {...props} />},
        }, config
      )
      NotificationsStack.path = '';

      const JobListStack = createStackNavigator(
        {
          JobList: {screen: props => <JobListScreen  {...props} />},
        }, config
      )
      JobListStack.path = '';

      const LoginStack = createStackNavigator(
        {
          Access: {screen: props => <Access {...props} screenProps={this.updateAppApp} />},
        }, config
      )
      LoginStack.path = '';

      const SignupStack = createStackNavigator(
        {
          SignUp: {screen: props => <SignUp {...props} screenProps={this.updateAppApp} />},
        }, config
      )
      SignupStack.path = '';


      // These are the app containers for the Authorisation and then the two

      const barConfig = {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
          activeTintColor: 'orange',
          inactiveTintColor: 'gray',
          inactiveBackgroundColor: 'black',
          activeBackgroundColor: '#323c4d'
        },
      }

      const AccessBottomBar = createBottomTabNavigator(
        {
          'Log In': LoginStack,
          'Sign Up': SignupStack
        },
        barConfig
      );

      const ArtistBottomBar = createBottomTabNavigator(
        {
          Venue: VenuesStack,
          Gigs: GigsStack,
          Profile: ProfileStack
        },
        barConfig
      );

      const PhotographerBottomBar = createBottomTabNavigator(
        {
          Notifications: NotificationsStack,
          'Job List': JobListStack,
          Profile: ProfileStack
        },
        barConfig
      );

      const AccessContainer = createAppContainer(AccessBottomBar);

      const ArtistContainer = createAppContainer(ArtistBottomBar);
      const PhotographerContainer = createAppContainer(PhotographerBottomBar);




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
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center'

  },
  statusbar: {
    backgroundColor: '#f542da',
    height: 20,
  },
  main: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0b1424'
  }
});

export default App;
