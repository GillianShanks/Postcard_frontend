import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';

export default class TodoItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    const todoItem = this.props.todoItem;
    return (
      <TouchableOpacity style={StyleSheet.todoItem}>
        <Text style={(todoItem.done) ? {color: '#AAAAAA'} : {color: '#313131'}}>
          {todoItem.title}
        </Text>
      </TouchableOpacity>
    )
  }
}
