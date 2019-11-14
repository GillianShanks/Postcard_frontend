import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import NotificationItem from '../components/NotificationItem';

class NotificationsScreen extends React.Component {

  static navigationOptions = {
    title: 'Postcard - Notifications',
  };

  //data in the FlatList is dummy data for visual purposes
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        <FlatList
          style={styles.list}
          data={[{venue: 'King Tuts', date: 'Now', customer: 'James Hawthorne', type: 'Solo'}, {venue: 'ABC', date: 'January 1st, 2020 at 7pm', customer: 'Ruby Riot', type: 'Band'}, {venue: 'SECC', date: 'Februrary 10th, 2020 at 8pm', customer: 'Aaron Carter', type: 'Solo'}]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ ({item, index}) => {
            return(
              <NotificationItem notificationItem={item} />
            )
          }}
        />
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
  list: {
    width: '100%',
  }
})

export default NotificationsScreen;
