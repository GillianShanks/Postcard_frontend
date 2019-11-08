import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function GigsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Gigs List</Text>
    </ScrollView>
  );
}

GigsScreen.navigationOptions = {
  title: 'Gigs',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
