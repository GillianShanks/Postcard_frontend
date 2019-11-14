import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default class RadioButtons extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value: ''
    }
  }

render(){
  return(
    <View>
    {this.props.options.map(item => {
      return (
        <View
        key={item.key}
        style={styles.buttonContainer}>

        <Text style={styles.basicText}>{item.text}</Text>
        <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          this.setState({value: item.key})
          this.props.userType(item.key)
        }}>

        {this.state.value === item.key && (<View style={styles.checkedCircle} />)}

        </TouchableOpacity>

        </View>
      );
    })}
    </View>
  );
}
}

const styles = StyleSheet.create({
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
  },
  circle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ACACAC',
      alignItems: 'center',
      justifyContent: 'center',
  },
  checkedCircle: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: 'orange',
  },
  basicText: {
    color: '#e8effa',

  }
});
