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
        <Text style={styles.basicText}>Venue</Text>
        <Text style={styles.biggerText}>{venueItem.name}</Text>
        <Text style={styles.basicText}>Contact</Text>
        <Text style={styles.biggerText}>{ venueItem.email }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
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
