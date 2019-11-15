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
        <View style={styles.giglist}>
        <Text style={styles.basicText}>Venue</Text>
        <Text style={styles.biggerText}>King Tuts</Text>
        <Text style={styles.basicText}>Date/Time</Text>
        <Text style={styles.biggerText}>Friday 15th Nov, 8pm</Text>
        </View>
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
    padding: 10,
  },
  title: {
    alignItems: 'center',
    fontSize: 26,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'orange',
    textTransform: 'uppercase'
  },
  basicText: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: 'orange'
  },
  biggerText: {
    color: '#e8effa',
    fontSize: 18,
    marginBottom: 5,
  },
  giglist: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  }
})

export default GigsScreen;
