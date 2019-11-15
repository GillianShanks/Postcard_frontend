import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

class NotificationsScreen extends React.Component {

  static navigationOptions = {
    title: 'Postcard - JobList',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Job List</Text>
        <View style={styles.joblist}>
        <Text style={styles.basicText}>Artist</Text>
        <Text style={styles.biggerText}>Kyle's One Man Band</Text>
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
  joblist: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
})

export default NotificationsScreen;
