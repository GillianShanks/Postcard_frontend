import React from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const InputBar = (props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={(emailInput) => props.textChangeEmail(emailInput)}
        value={props.emailInput}/>
        <TextInput
          style={styles.input}
          onChangeText={(passwordInput) => props.textChangePassword(passwordInput)}
          value={props.passwordInput}/>
      <TouchableOpacity style={styles.addButton} onPress={props.addNewUser}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#171717',
    shadowOpacity: 0.1
  },
  input: {
    backgroundColor: 'lavender',
    flex: 1,
    fontSize: 18,
    height: 35,
    borderWidth: 1
  },
  addButton: {
    width: 100,
    backgroundColor: '#f542da',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#171717',
    fontSize: 18,
    fontWeight: '700'
  }
})

export default InputBar;
