import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class VenueItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const venueItem = this.props.venueItem;

    return (
      <View style={styles.container}>
        <Text>Venue: {'Wonderful Place' || venueItem.name}</Text>
        <Text> Contact: { venueItem.email }</Text>
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
})
