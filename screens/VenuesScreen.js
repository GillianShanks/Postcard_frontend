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
            <Text style={styles.basicText}>Loading venues...</Text>
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
    width: '100%',
    backgroundColor: '#0b1424',

  },
  title: {
    alignItems: 'center',
    fontSize: 20,
    paddingBottom: 10,
    color: '#e8effa',
  },
  list: {
    width: '100%',
  },
  basicText: {
    color: '#e8effa',
    alignItems: 'center',
  }
})

export default VenuesScreen;
