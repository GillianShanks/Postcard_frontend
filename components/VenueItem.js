import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class VenueItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const venueItem = this.props.venueItem;

    return (
      <View>
      <Text>
      { venueItem.email }
      </Text>
      </View>
    )}
  }
