import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import {f, auth, firestore} from '../config/config.js';


class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Postcard - Your Profile',
  };

  constructor(props){
    super(props);
  }


  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>

      <View style={styles.info}>
        <Text style={styles.basicText}>Name: {this.props.screenProps[0].displayName}</Text>
        <Text style={styles.basicText}>Email: {this.props.screenProps[0].email}</Text>
        <Text style={styles.basicText}>Phone number: {this.props.screenProps[0].phoneNumber}</Text>
        <Text style={styles.basicText}>You are {this.props.screenProps[0].userType==='artist' ? 'an artist' : 'a photographer'}.</Text>
        <View>
          {
            this.props.screenProps[0].userType==='artist' ?
            (<Text>  </Text>)
            :
            (<Text style={styles.basicText}>Camera: {this.props.screenProps[0].camera}</Text>)
          }
        </View>
      </View>
      <TouchableHighlight
        onPress={() => {
          auth.signOut()
          .catch((error) => {
            console.log('Error:', error);
          });
        }}
        style={styles.logoutButton}>

        <Text style={{color: '#fff'}}>
          Log Out
        </Text>

      </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#0b1424',
  },
  title: {
    alignItems: 'center',
    fontSize: 20,
    paddingBottom: 10,
    color: '#e8effa',

  },
  info: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 20,
  },
  logoutButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    backgroundColor: 'red',
  },
  basicText: {
    color: '#e8effa',
  }
})

export default ProfileScreen;
