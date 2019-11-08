import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function MediaScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Photos And Videos</Text>
    </ScrollView>
  );
}

MediaScreen.navigationOptions = {
  title: 'Media',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
