import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Postcard',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
      <Button
        title="Profile"
        onPress={() => navigate('Profile')}
      />
      <Button
        title="Gigs"
        onPress={() => navigate('Gigs')}
      />
      </View>
    );
  }
}

export default HomeScreen;
