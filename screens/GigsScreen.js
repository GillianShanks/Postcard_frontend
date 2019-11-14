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
        <Text style={styles.title}>Gigs</Text>
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
  basicText: {
    color: '#e8effa',

  }
})

export default GigsScreen;
