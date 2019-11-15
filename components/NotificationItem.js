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
        <Text style={styles.basicText}>Venue</Text>
        <Text style={styles.biggerText}>{notif.venue}</Text>
        <Text style={styles.basicText}>Date</Text>
        <Text style={styles.biggerText}>{notif.date}</Text>
        <Text style={styles.basicText}>Customer</Text>
        <Text style={styles.biggerText}>{notif.customer}</Text>
        <Text style={styles.basicText}>Type of act</Text>
        <Text style={styles.biggerText}>{notif.type}</Text>
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
    marginBottom: 10
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
  }
})
