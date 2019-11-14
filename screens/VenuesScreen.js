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
      <View style={styles.container}>
        {this.props.screenProps[1] ?
          (
            <View style={styles.container}>
              <Text style={styles.title}>Venues</Text>
              <FlatList
                style={styles.list}
                data={this.props.screenProps[1]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ ({item, index}) => {
                  return(
                    <VenueItem venueItem={item} />
                  )
                }}
              />
            </View>
          ):(
            <Text>Loading venues...</Text>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    alignItems: 'center',
    fontSize: 20,
    paddingBottom: 10,
  },
  list: {
    width: '100%',
  }
})

export default VenuesScreen;
