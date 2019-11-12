import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function GigsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.gigs}>
        <Text>Gigs List</Text>
      </View>
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
  gigs: {
    padding: 10
  }
});
