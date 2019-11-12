import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

class GigsScreen extends React.Component {

  static navigationOptions = {
    title: 'Postcard',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Gigs</Text>
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

export default GigsScreen;
