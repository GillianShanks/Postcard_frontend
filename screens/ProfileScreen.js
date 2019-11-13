import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Postcard',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <Text>Your Postcard Profile Details:</Text>

      <Text>Name: {this.props.screenProps.displayName}</Text>
      <Text>Email: {this.props.screenProps.email}</Text>
      <Text>Phone number: {this.props.screenProps.phoneNumber}</Text>
      <Text>You are a {this.props.screenProps.userType}</Text>
      <Text>Camera: {this.props.screenProps.camera}</Text>

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
