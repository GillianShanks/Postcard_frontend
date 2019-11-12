import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';

import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('AuthLoading');
  };

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
          source={
            __DEV__
            ? require('../assets/images/yaas.gif')
            : require('../assets/images/yaas.gif')
          }
          style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Welcome To  Postcard</Text>

          <TouchableOpacity style={styles.button}>
            <Button style={styles.buttonText} onPress={this._signOutAsync} title="Sign out!"/>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}



HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
      Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
      Development mode is enabled: your app will be slower but you can use
      useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
      You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // contentContainer: {
  //   paddingTop: 30,
  // },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 280,
    height: 270,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'blue',
    padding: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900'
  }
});

export default HomeScreen;
