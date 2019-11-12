import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>

    <View style={styles.profiles}>
      <Text>Artist Profile</Text>

    </View>
    </ScrollView>
  );
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  profiles: {
    padding: 10
  }
});
