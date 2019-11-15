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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0b1424',
  },
  title: {
    alignItems: 'center',
    fontSize: 26,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'orange',
    textTransform: 'uppercase'
  },
})

export default NotificationsScreen;
