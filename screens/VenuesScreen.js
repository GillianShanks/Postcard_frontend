import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import VenueItem from '../components/VenueItem';

class VenuesScreen extends React.Component {
  static navigationOptions = {
    title: 'Postcard - Venues',
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
      {this.props.screenProps[1][2] ? (
      <View style={styles.container}>
      <Text>Venues</Text>

      <FlatList
      data={this.props.screenProps[1]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={ ({item, index}) => {
        return(
          <VenueItem venueItem={item} />
        )
      }}
      />

      <Text>Venue: {this.props.screenProps[1][2].name}</Text>

      <Button
        title="Profile"
        onPress={() => navigate('Profile')}
      />
      <Button
        title="Gigs"
        onPress={() => navigate('Gigs')}
      />
      </View>):(
        <Text>Loading venues...</Text>
      )}
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

export default VenuesScreen;
