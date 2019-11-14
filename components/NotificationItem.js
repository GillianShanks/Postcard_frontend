import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class NotificationItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const notif = this.props.notificationItem;

    return (
      <View style={styles.container}>
        <Text style={styles.basicText}>Venue: {notif.venue}</Text>
        <Text style={styles.basicText}>Date: {notif.date}</Text>
        <Text style={styles.basicText}>Customer: {notif.customer}</Text>
        <Text style={styles.basicText}>Type of act: {notif.type}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  basicText: {
    color: '#e8effa',
  }
})
