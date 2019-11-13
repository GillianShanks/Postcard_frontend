import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

class VenuesScreen extends React.Component {
  static navigationOptions = {
    title: 'Postcard - Venues',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
      <Text>Venues</Text>
      <Text>Hello Artist</Text>
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

export default VenuesScreen;
