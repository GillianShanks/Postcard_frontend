import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function VenuesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.venues}>
        <Text>Partnered Venues</Text>
      </View>
    </ScrollView>
  );
}

VenuesScreen.navigationOptions = {
  title: 'Venues',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  venues: {
    padding: 10
  }
});
