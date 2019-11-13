import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

class NotificationsScreen extends React.Component {

  static navigationOptions = {
    title: 'Postcard - Notifications',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Notifications</Text><View>
        <Text>Hello Photographer</Text>
        <Button
          title="Profile"
          onPress={() => navigate('Profile')}
        />
        <Button
          title="Job List"
          onPress={() => navigate('JobList')}
        />
        </View>
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

export default NotificationsScreen;
