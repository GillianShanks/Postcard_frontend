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
      <Text>Your Postcard Profile Details:</Text>

      <Text>Name: {this.props.screenProps[0].displayName}</Text>
      <Text>Email: {this.props.screenProps[0].email}</Text>
      <Text>Phone number: {this.props.screenProps[0].phoneNumber}</Text>
      <Text>You are a {this.props.screenProps[0].userType}</Text>
      <Text>Camera: {this.props.screenProps[0].camera}</Text>

      <TouchableHighlight
        onPress={() => {
          auth.signOut()
          .then(() => {
            console.log('Logged out...');
          })
          .catch((error) => {
            console.log('Error:', error);
          });
        }}
        style={{backgroundColor: 'black'}}>

        <Text style={{color: '#fff'}}>
          Log out.
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
  }
})

export default ProfileScreen;
