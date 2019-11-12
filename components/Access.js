// Will show log in and sign up buttons.
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Access = (props) => {
  return (
    <View>
      <TouchableOpacity>
        <Text>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Sign Up</Text>
      </TouchableOpacity>

    </View>
  );
}

export default Access;
