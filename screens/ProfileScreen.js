import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import {f, auth, firestore} from '../config/config.js';


class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Postcard - Your Profile',
  };

  constructor(props){
    super(props);
  }


  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <Text style={styles.title}>PROFILE</Text>

      <View style={styles.info}>
        <Text style={styles.basicText}>Name</Text>
        <Text style={styles.biggerText}>{this.props.screenProps[0].displayName}</Text>
        <Text style={styles.basicText}>Email</Text>
        <Text style={styles.biggerText}>{this.props.screenProps[0].email}</Text>
        <Text style={styles.basicText}>Phone number</Text>
        <Text style={styles.biggerText}>{this.props.screenProps[0].phoneNumber}</Text>
        <Text style={styles.basicText}>User Type</Text>
        <Text style={styles.biggerText}>{this.props.screenProps[0].userType==='artist' ? 'Artist' : 'Photographer'}</Text>
        <View>
          {
            this.props.screenProps[0].userType==='artist' ?
            (<Text>  </Text>)
            :
            (<View>
              <Text style={styles.basicText}>Camera</Text>
              <Text style={styles.biggerText}>{this.props.screenProps[0].camera}</Text>
            </View>)
          }
        </View>
      </View>
      <TouchableHighlight
        onPress={() => {
          auth.signOut()
          .catch((error) => {
            console.log('Error when signing out', error);
          });
        }}
        style={styles.logoutButton}>

        <Text style={{color: '#fff'}}>
          Log Out
        </Text>

      </TouchableHighlight>

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
    fontSize: 26,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'orange',
    textTransform: 'uppercase'
  },
  info: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 20,
  },
  logoutButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'darkorange',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'darkorange',
    marginTop: 80,
  },
  basicText: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: 'orange'
  },
  biggerText: {
    color: '#e8effa',
    fontSize: 24,
    marginBottom: 5,
  }
})

export default ProfileScreen;
